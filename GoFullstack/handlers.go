package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

// Uniwersalne
func getAll[T any](c echo.Context, scopes ...func(*gorm.DB) *gorm.DB) error {
	var items []T
	query := db.Scopes(scopes...)
	query.Find(&items)
	return c.JSON(http.StatusOK, items)
}

func getByID[T any](c echo.Context, idParam string, scopes ...func(*gorm.DB) *gorm.DB) error {
	id, err := strconv.Atoi(c.Param(idParam))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	item := new(T)
	query := db.Scopes(scopes...)
	if err := query.First(item, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Not found")
	}
	return c.JSON(http.StatusOK, item)
}

func create[T any](c echo.Context) error {
	item := new(T)
	if err := c.Bind(item); err != nil {
		return err
	}

	db.Create(item)
	return c.JSON(http.StatusCreated, item)
}

func update[T any](c echo.Context, idParam string) error {
	id, _ := strconv.Atoi(c.Param(idParam))
	item := new(T)

	if db.First(item, id).Error != nil {
		return c.JSON(http.StatusNotFound, "Not found")
	}

	if err := c.Bind(item); err != nil {
		return err
	}

	db.Save(item)
	return c.JSON(http.StatusOK, item)
}

func delete[T any](c echo.Context, idParam string) error {
	id, _ := strconv.Atoi(c.Param(idParam))
	item := new(T)

	if db.First(item, id).Error != nil {
		return c.JSON(http.StatusNotFound, "Not found")
	}

	db.Delete(item)
	return c.NoContent(http.StatusNoContent)
}

// Produkty
func getProductsByCategory(c echo.Context) error {
	categoryID, err := strconv.Atoi(c.Param("category_id"))
	if err != nil {
		return c.JSON(400, "Invalid category ID")
	}
	var products []Product
	db.Scopes(ScopeByCategory(uint(categoryID))).Find(&products)
	return c.JSON(200, products)
}

func getExpensiveProducts(c echo.Context) error {
	var products []Product
	db.Scopes(ScopeExpensiveProducts(100.0)).Find(&products)
	return c.JSON(200, products)
}

// Koszyk
func addProductToCart(c echo.Context) error {
	cartID, _ := strconv.Atoi(c.Param("cart_id"))
	productID, _ := strconv.Atoi(c.Param("product_id"))

	var cart Cart
	db.First(&cart, cartID)
	if cart.ID == 0 {
		return c.JSON(http.StatusNotFound, "Cart not found")
	}

	var product Product
	db.First(&product, productID)
	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}
	db.Model(&cart).Association("Products").Append(&product)

	return c.JSON(http.StatusOK, cart)
}

func removeProductFromCart(c echo.Context) error {
	cartID, _ := strconv.Atoi(c.Param("cart_id"))
	productID, _ := strconv.Atoi(c.Param("product_id"))

	var cart Cart
	db.First(&cart, cartID)
	if cart.ID == 0 {
		return c.JSON(http.StatusNotFound, "Cart not found")
	}

	var product Product
	db.First(&product, productID)
	if product.ID == 0 {
		return c.JSON(http.StatusNotFound, "Product not found")
	}
	db.Model(&cart).Association("Products").Delete(&product)

	return c.JSON(http.StatusOK, cart)
}
