package handlers

import (
	"os/exec"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func build(ctx echo.Context) error {
	cmd := exec.Command("cmake", "-B./cpp", "-H./cpp")
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}

	cmd = exec.Command("make", "-C./cpp")
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}

	return nil
}
