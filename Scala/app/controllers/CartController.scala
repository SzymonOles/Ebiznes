package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.CartItem

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private var cart = List.empty[CartItem]

  def getAllCartItems: Action[AnyContent] = Action {
    Ok(Json.toJson(cart))
  }

  def getCartItem(productId: Int): Action[AnyContent] = Action {
    cart.find(_.productId == productId) match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound(Json.obj("error" -> "Cart item not found"))
    }
  }

  def addCartItem: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem] match {
      case JsSuccess(newItem, _) =>
        cart = cart :+ newItem
        Created(Json.toJson(newItem))
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON", "details" -> errors.toString))
    }
  }

  def updateCartItem(productId: Int): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem] match {
      case JsSuccess(updatedItem, _) =>
        cart.indexWhere(_.productId == productId) match {
          case -1 => NotFound(Json.obj("error" -> "Cart item not found"))
          case idx =>
            cart = cart.updated(idx, updatedItem)
            Ok(Json.toJson(updatedItem))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON", "details" -> errors.toString))
    }
  }

  def deleteCartItem(productId: Int): Action[AnyContent] = Action {
    val initialSize = cart.size
    cart = cart.filterNot(_.productId == productId)
    if (cart.size < initialSize) NoContent else NotFound(Json.obj("error" -> "Cart item not found"))
  }
}
