package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&Product{}, &Category{}, &Cart{})
	return db
}

// test 1
// asssert 0-2
func TestScopeByCategory(t *testing.T) {
	db := setupTestDB()
	db.Create(&Product{Name: "Item A", CategoryID: 1})
	db.Create(&Product{Name: "Item B", CategoryID: 2})

	var result []Product
	db.Scopes(ScopeByCategory(1)).Find(&result)

	assert.Len(t, result, 1)
	assert.Equal(t, "Item A", result[0].Name)
}

// test 2
// assert 2-4
func TestScopeExpensiveProducts(t *testing.T) {
	db := setupTestDB()
	db.Create(&Product{Name: "Cheap", Price: 10})
	db.Create(&Product{Name: "Expensive", Price: 150})

	var result []Product
	db.Scopes(ScopeExpensiveProducts(100)).Find(&result)

	assert.Len(t, result, 1)
	assert.Equal(t, "Expensive", result[0].Name)
}

// test 3
// assert 4-8
func TestProductStruct(t *testing.T) {
	product := Product{ID: 1, Name: "Test", Price: 99.99, CategoryID: 2}

	assert.Equal(t, uint(1), product.ID)
	assert.Equal(t, "Test", product.Name)
	assert.Equal(t, 99.99, product.Price)
	assert.Equal(t, uint(2), product.CategoryID)
}

// test 4
// assert 8-11
func TestCategoryStruct(t *testing.T) {
	category := Category{ID: 5, Name: "Food"}

	assert.Equal(t, uint(5), category.ID)
	assert.Equal(t, "Food", category.Name)
	assert.Empty(t, category.Products)
}

// test 5
// assert 11-13
func TestCartStruct(t *testing.T) {
	cart := Cart{ID: 3}

	assert.Equal(t, uint(3), cart.ID)
	assert.Empty(t, cart.Products)
}

// test 6
// assert 13-16
func TestAddProductToCartAssociation(t *testing.T) {
	db := setupTestDB()
	product := Product{Name: "Item"}
	cart := Cart{}
	db.Create(&product)
	db.Create(&cart)

	err := db.Model(&cart).Association("Products").Append(&product)
	assert.Nil(t, err)

	var updated Cart
	db.Preload("Products").First(&updated, cart.ID)
	assert.Len(t, updated.Products, 1)
	assert.Equal(t, "Item", updated.Products[0].Name)
}

// test 7
// assert 16-18
func TestCreateProductWithInvalidCategory(t *testing.T) {
	db := setupTestDB()
	product := Product{Name: "Ghost Product", Price: 10.0, CategoryID: 999}

	result := db.Create(&product)
	assert.NoError(t, result.Error)

	var found Product
	db.First(&found, product.ID)
	assert.Equal(t, "Ghost Product", found.Name)

}

// test 8
// assert 18 - 20
func TestAutoIncrementIDs(t *testing.T) {
	db := setupTestDB()
	db.Create(&Product{Name: "Item 1"})
	db.Create(&Product{Name: "Item 2"})

	var products []Product
	db.Find(&products)

	assert.Len(t, products, 2)
	assert.True(t, products[0].ID < products[1].ID)

}

// test 9
// assert 20-21
func TestEmptyCartHasNoProducts(t *testing.T) {
	db := setupTestDB()
	cart := Cart{}
	db.Create(&cart)

	var found Cart
	db.Preload("Products").First(&found, cart.ID)
	assert.Empty(t, found.Products)

}

// test 10
// assert 21-25
func TestCategoryWithMultipleProducts(t *testing.T) {
	db := setupTestDB()

	category := Category{Name: "Tech"}
	products := []Product{
		{Name: "Laptop", Price: 1200},
		{Name: "Mouse", Price: 25},
	}
	category.Products = products
	db.Create(&category)

	var found Category
	db.Preload("Products").First(&found, category.ID)

	assert.Equal(t, "Tech", found.Name)
	assert.Len(t, found.Products, 2)
	assert.Equal(t, "Laptop", found.Products[0].Name)
	assert.Equal(t, "Mouse", found.Products[1].Name)

}

// test 11
// assert 25-26
func TestUpdateProductPrice(t *testing.T) {
	db := setupTestDB()

	product := Product{Name: "Old", Price: 50}
	db.Create(&product)

	db.Model(&product).Update("Price", 99.99)

	var updated Product
	db.First(&updated, product.ID)
	assert.Equal(t, 99.99, updated.Price)

}
