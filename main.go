package main

import (
	"net/http"

	"github.com/Gurpartap/logrus-stack"
	"github.com/ZzEeKkAa/team-project/config"
	"github.com/ZzEeKkAa/team-project/handlers"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func main() {
	log.AddHook(logrus_stack.StandardHook())
	config.LoadViperConfig()
	logger := log.WithField("logger", "main")

	if echo, err := handlers.Init(viper.Sub("handlers")); err != nil {
		logger.Error(err)
	} else {
		http.Handle("/", echo)

		if err := http.ListenAndServe(viper.GetString("address"), nil); err != nil {
			log.Error(err)
		}
	}
}
