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
	}

	body, err := ioutil.ReadAll(ctx.Request().Body)
	if err != nil {
		log.Error(err)

		return err
	}

	json.Unmarshal(body, &req)

	fin, err := os.Create("./cpp/in.txt")
	if err != nil {
		log.Error(err)

		return err
	}

	fmt.Fprintf(fin, "0\n%d\n", len(req.InitialConditions))
	for _, p := range req.InitialConditions {
		fmt.Fprintf(fin, "%f\n%f\n%f\n%f\n", p.X1, p.X2, p.T, p.Y)
	}
	fmt.Fprintf(fin, "%d\n", len(req.BoundaryConditions))
	for _, p := range req.BoundaryConditions {
		fmt.Fprintf(fin, "%f\n%f\n%f\n%f\n", p.X1, p.X2, p.T, p.Y)
	}

	fmt.Fprintf(fin, "0\n%d\n", len(req.ModelingConditionsField))
	for _, p := range req.ModelingConditionsField {
		fmt.Fprintf(fin, "%f\n%f\n%f\n", p.X1, p.X2, p.T)
	}
	fmt.Fprintf(fin, "%d\n", len(req.ModelingConditionsZero))
	for _, p := range req.ModelingConditionsZero {
		fmt.Fprintf(fin, "%f\n%f\n%f\n", p.X1, p.X2, p.T)
	}
	fmt.Fprintf(fin, "%d\n", len(req.ModelingConditionsBound))
	for _, p := range req.ModelingConditionsBound {
		fmt.Fprintf(fin, "%f\n%f\n%f\n", p.X1, p.X2, p.T)
	}
	fmt.Fprintf(fin, "%f\n%f\n%f\n%f\n%f\n", req.A0, req.B0, req.A1, req.B1, req.T)
	fmt.Fprint(fin, "20\n20\n20\n")

	fin.Close()

	cmdS := "./cpp/solve"
	if target == "win32" {
		cmdS += ".exe"
	}
	cmd := exec.Command(cmdS)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}

	var res struct {
		Res []valuePoint `json:"res"`
	}

	jRes, err := json.Marshal(res)
	if err != nil {
		log.Error(err)

		return err
	}

	ctx.Response().Write(jRes)

	return nil
}
