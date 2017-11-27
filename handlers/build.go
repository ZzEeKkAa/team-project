package handlers

import (
	"os/exec"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func build(_ echo.Context) error {
	if runCMake {
		cmd := exec.Command("cmake", "-B./cpp", "-H./cpp")
		if err := cmd.Run(); err != nil {
			log.Println(err)

			return err
		}
	}

	cmd := exec.Command(makePath, "-C./cpp")
	if err := cmd.Run(); err != nil {
		log.Println(err)

		return err
	}

	return nil
}
