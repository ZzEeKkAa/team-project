package config

import (
	"os"
	"path/filepath"

	"github.com/spf13/viper"
)

const envVarName = "APP_CONFIG"
const defaultConfigPath = "./config.yaml"

func LoadViperConfig() {
	dir, name, ext := getViperConfiguration(getConfigPath())

	viper.AddConfigPath(dir)
	viper.SetConfigName(name)
	viper.SetConfigType(ext)

	if err := viper.ReadInConfig(); err != nil {
		panic("Can't read config: " + err.Error())
	}
}

// Returns dir, file name and file extension of the given path to config.
func getViperConfiguration(configPath string) (string, string, string) {
	dir, name := filepath.Split(configPath)
	ext := filepath.Ext(configPath)
	if ext == "" {
		panic("You must specify extension for config file!")
	}
	ext = ext[1:]                      // Remove dot.
	name = name[:len(name)-len(ext)-1] // Trim extension suffix with dot.

	return dir, name, ext
}

// Get path to application config.
// Uses default path if env was not specified.
func getConfigPath() string {
	path := os.Getenv(envVarName)
	if path == "" {
		path = defaultConfigPath
	}

	return path
}
