package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func fval(ctx echo.Context) error {
	if err := ctx.Request().ParseForm(); err != nil {
		log.Error(err)

		return err
	}
	X := ctx.Request().PostFormValue("x1")
	Y := ctx.Request().PostFormValue("x2")
	T := ctx.Request().PostFormValue("t")

	fmt.Println(X, Y, T)

	buf := new(bytes.Buffer)

	cmd := exec.Command("./cpp/fval", X, Y, T)
	cmd.Stdout = buf
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}
	res, err := strconv.ParseFloat(strings.TrimSpace(buf.String()), 64)
	if err != nil {
		log.Error(err)

		return err
	}

	jRes, err := json.Marshal(struct {
		Res float64 `json:"res"`
	}{Res: res})
	if err != nil {
		log.Error(err)

		return err
	}

	ctx.Response().Write(jRes)

	return nil
}
