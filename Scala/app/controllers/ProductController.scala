package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Product

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private var products = List(
    Product(1, "Laptop", 2500.00),
    Product(2, "Smartphone", 1200.50),
    Product(3, "Tablet", 800.75)
  )

  def getAllProducts: Action[AnyContent] = Action {
    Ok(Json.toJson(products))
  }

  def getProduct(id: Int): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def addProduct: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product] match {
      case JsSuccess(newProduct, _) =>
        products = products :+ newProduct
        Created(Json.toJson(newProduct))
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON", "details" -> errors.toString))
    }
  }

  def updateProduct(id: Int): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product] match {
      case JsSuccess(updatedProduct, _) =>
        products.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("error" -> "Product not found"))
          case idx =>
            products = products.updated(idx, updatedProduct)
            Ok(Json.toJson(updatedProduct))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON", "details" -> errors.toString))
    }
  }

  def deleteProduct(id: Int): Action[AnyContent] = Action {
    val initialSize = products.size
    products = products.filterNot(_.id == id)
    if (products.size < initialSize) NoContent else NotFound(Json.obj("error" -> "Product not found"))
  }
}
