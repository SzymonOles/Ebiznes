package main

import "github.com/labstack/echo/v4"

func registerRoutes(e *echo.Echo) {
	// Produkty - unikatowe
	e.GET("/products/category/:category_id", getProductsByCategory)
	e.GET("/products/expensive", getExpensiveProducts)

	// Produkty w Koszyku
	e.POST("/carts/:cart_id/products/:product_id", addProductToCart)
	e.DELETE("/carts/:cart_id/products/:product_id", removeProductFromCart)

	// Uniwersalne
	e.GET("/products", func(c echo.Context) error { return getAll[Product](c) })
	e.GET("/products/:id", func(c echo.Context) error { return getByID[Product](c, "id") })
	e.POST("/products", func(c echo.Context) error { return create[Product](c) })
	e.PUT("/products/:id", func(c echo.Context) error { return update[Product](c, "id") })
	e.DELETE("/products/:id", func(c echo.Context) error { return delete[Product](c, "id") })

	e.GET("/categories", func(c echo.Context) error { return getAll[Category](c, ScopeWithProducts()) })
	e.GET("/categories/:id", func(c echo.Context) error { return getByID[Category](c, "id", ScopeWithProducts()) })
	e.POST("/categories", func(c echo.Context) error { return create[Category](c) })
	e.PUT("/categories/:id", func(c echo.Context) error { return update[Category](c, "id") })
	e.DELETE("/categories/:id", func(c echo.Context) error { return delete[Category](c, "id") })

	e.GET("/carts", func(c echo.Context) error { return getAll[Cart](c, ScopeWithProducts()) })
	e.GET("/carts/:id", func(c echo.Context) error { return getByID[Cart](c, "id", ScopeWithProducts()) })
	e.POST("/carts", func(c echo.Context) error { return create[Cart](c) })
	e.PUT("/carts/:id", func(c echo.Context) error { return update[Cart](c, "id") })
	e.DELETE("/carts/:id", func(c echo.Context) error { return delete[Cart](c, "id") })

	e.GET("/sellers", func(c echo.Context) error { return getAll[Seller](c) })
	e.GET("/sellers/:id", func(c echo.Context) error { return getByID[Seller](c, "id") })
	e.POST("/sellers", func(c echo.Context) error { return create[Seller](c) })
	e.PUT("/sellers/:id", func(c echo.Context) error { return update[Seller](c, "id") })
	e.DELETE("/sellers/:id", func(c echo.Context) error { return delete[Seller](c, "id") })

	e.GET("/buyers", func(c echo.Context) error { return getAll[Buyer](c) })
	e.GET("/buyers/:id", func(c echo.Context) error { return getByID[Buyer](c, "id") })
	e.POST("/buyers", func(c echo.Context) error { return create[Buyer](c) })
	e.PUT("/buyers/:id", func(c echo.Context) error { return update[Buyer](c, "id") })
	e.DELETE("/buyers/:id", func(c echo.Context) error { return delete[Buyer](c, "id") })
}
