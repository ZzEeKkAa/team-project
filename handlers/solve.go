package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

type point struct {
	X1 float64 `json:"x1"`
	X2 float64 `json:"x2"`
	T  float64 `json:"t"`
}

type valuePoint struct {
	X1 float64 `json:"x1"`
	X2 float64 `json:"x2"`
	T  float64 `json:"t"`
	Y  float64 `json:"y"`
}
type jsPoints struct {
	X []float64 `json:"x"`
	Y []float64 `json:"y"`
	Z []float64 `json:"z"`
}

func solve(ctx echo.Context) error {
	var req struct {
		InitialConditions       []valuePoint `json:"init_cond"`
		BoundaryConditions      []valuePoint `json:"bound_cond"`
		ModelingConditionsField []point      `json:"mod_cond_field"`
		ModelingConditionsZero  []point      `json:"mod_cond_zero"`
		ModelingConditionsBound []point      `json:"mod_cond_bound"`
		A0                      float64      `json:"a0"`
		B0                      float64      `json:"b0"`
		A1                      float64      `json:"a1"`
		B1                      float64      `json:"b1"`
		T                       float64      `json:"t"`
		NX1                     int          `json:"nx1"`
		NX2                     int          `json:"nx2"`
		NT                      int          `json:"nt"`
	}

	body, err := ioutil.ReadAll(ctx.Request().Body)
	if err != nil {
		log.Error(err)

		return err
	}

	fmt.Print(string(body))

	if err := json.Unmarshal(body, &req); err != nil {
		log.Error(err)

		return err
	}

	fmt.Println(req)

	fin, err := os.Create("./cpp/in.txt")
	if err != nil {
		log.Error(err)

		return err
	}

	fmt.Fprintf(fin, "1\n%d\n", len(req.InitialConditions))
	for _, p := range req.InitialConditions {
		fmt.Fprintf(fin, "%f %f %f %f\n", p.X1, p.X2, p.T, p.Y)
	}
	fmt.Fprintf(fin, "%d\n", len(req.BoundaryConditions))
	for _, p := range req.BoundaryConditions {
		fmt.Fprintf(fin, "%f %f %f %f\n", p.X1, p.X2, p.T, p.Y)
	}

	fmt.Fprintf(fin, "1\n%d\n", len(req.ModelingConditionsField))
	for _, p := range req.ModelingConditionsField {
		fmt.Fprintf(fin, "%f %f %f\n", p.X1, p.X2, p.T)
	}
	fmt.Fprintf(fin, "%d\n", len(req.ModelingConditionsZero))
	for _, p := range req.ModelingConditionsZero {
		fmt.Fprintf(fin, "%f %f %f\n", p.X1, p.X2, p.T)
	}
	fmt.Fprintf(fin, "%d\n", len(req.ModelingConditionsBound))
	for _, p := range req.ModelingConditionsBound {
		fmt.Fprintf(fin, "%f %f %f\n", p.X1, p.X2, p.T)
	}
	fmt.Fprintf(fin, "%f\n%f\n%f\n%f\n%f\n", req.A0, req.B0, req.A1, req.B1, req.T)
	fmt.Fprintf(fin, "%d\n%d\n%d\n", req.NX1, req.NX2, req.NT)

	fin.Close()

	cmdS := "./cpp/solve"
	var args []string

	if builder == "octave" {
		cmdS = "octave"
		args = []string{"./octave/alg.m"}
	}

	if target == "win32" {
		cmdS += ".exe"
	}
	cmd := exec.Command(cmdS, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}

	var res []jsPoints

	fout, err := os.Open("./cpp/out.txt")
	if err != nil {
		log.Error(err)

		return err
	}

	if _, err := fmt.Fscanf(fout, "%d \n %d \n %d \n", &req.NX1, &req.NX2, &req.NT); err != nil {
		log.Error(err)

		return err
	}

	for t := 0; t <= req.NT; t++ {
		var p jsPoints
		for x2 := 0; x2 <= req.NX2; x2++ {
			for x1 := 0; x1 <= req.NX1; x1++ {
				var f float64
				fmt.Fscanf(fout, "%f", &f)
				p.X = append(p.X, req.A0+(req.B0-req.A0)*float64(x1))
				p.Y = append(p.Y, req.A1+(req.B1-req.A1)*float64(x2))
				p.Z = append(p.Z, f)
			}
		}
		res = append(res, p)
	}

	jRes, err := json.Marshal(res)
	if err != nil {
		log.Error(err)

		return err
	}

	ctx.Response().Write(jRes)

	return nil
}
