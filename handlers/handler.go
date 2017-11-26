package handlers

import (
	"html/template"
	"io"
	"os"
	"path"

	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"github.com/spf13/viper"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func Init(config *viper.Viper) (*echo.Echo, error) {
	assetsPath := config.GetString("assets")

	e := echo.New()
	e.Renderer = &Template{templates: template.Must(template.ParseGlob(path.Join(assetsPath, "*.html")))}

	e.Static("/css", path.Join(assetsPath, "css"))
	e.Static("/js", path.Join(assetsPath, "js"))
	e.Static("/img", path.Join(assetsPath, "img"))

	e.GET("/", func(ctx echo.Context) error {
		f, err := os.Open(path.Join(assetsPath, "index.html"))
		if err != nil {
			log.Error(err)

			return err
		}
		io.Copy(ctx.Response(), f)
		return nil
		//return ctx.Render(http.StatusOK, "index.html", nil)
	})

	return e, nil
}
