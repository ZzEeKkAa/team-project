package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strconv"
	"strings"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func fvals(ctx echo.Context) error {
	var req struct {
		Points []struct {
			X float64 `json:"x1"`
			Y float64 `json:"x2"`
			T float64 `json:"t"`
		} `json:"points"`
	}

	body, err := ioutil.ReadAll(ctx.Request().Body)
	if err != nil {
		log.Error(err)

		return err
	}

	json.Unmarshal(body, &req)

	buf := new(bytes.Buffer)

	var args []string
	args = append(args, fmt.Sprintf("%d", len(req.Points)))
	for _, p := range req.Points {
		args = append(args, fmt.Sprintf("%f", p.X), fmt.Sprintf("%f", p.Y), fmt.Sprintf("%f", p.T))
	}

	cmd := exec.Command("./cpp/fvals", args...)
	cmd.Stdout = buf
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}

	var res []float64
	for _, val := range strings.Split(buf.String(), "\n") {
		val = strings.TrimSpace(val)
		if val == "" {
			continue
		}

		fval, err := strconv.ParseFloat(val, 64)
		if err != nil {
			log.Error(err)

			return err
		}

		res = append(res, fval)
	}

	jRes, err := json.Marshal(struct {
		Res []float64 `json:"res"`
	}{Res: res})
	if err != nil {
		log.Error(err)

		return err
	}

	ctx.Response().Write(jRes)

	return nil
}
