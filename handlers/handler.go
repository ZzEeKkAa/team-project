package handlers

import (
	"html/template"
	"path"

	"io"

	"net/http"

	"github.com/labstack/echo"
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
		return ctx.Render(http.StatusOK, "index.html", nil)
	})

	return e, nil
}
