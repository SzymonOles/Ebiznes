package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import models.Category

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private var categories = List(
    Category(1, "Electronics"),
    Category(2, "Clothing"),
    Category(3, "Home & Kitchen")
  )

  def getAllCategories: Action[AnyContent] = Action {
    Ok(Json.toJson(categories))
  }

  def getCategory(id: Int): Action[AnyContent] = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound(Json.obj("error" -> "Category not found"))
    }
  }

  def addCategory: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Category] match {
      case JsSuccess(newCategory, _) =>
        categories = categories :+ newCategory
        Created(Json.toJson(newCategory))
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON", "details" -> errors.toString))
    }
  }

  def updateCategory(id: Int): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Category] match {
      case JsSuccess(updatedCategory, _) =>
        categories.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("error" -> "Category not found"))
          case idx =>
            categories = categories.updated(idx, updatedCategory)
            Ok(Json.toJson(updatedCategory))
        }
      case JsError(errors) =>
        BadRequest(Json.obj("error" -> "Invalid JSON", "details" -> errors.toString))
    }
  }

  def deleteCategory(id: Int): Action[AnyContent] = Action {
    val initialSize = categories.size
    categories = categories.filterNot(_.id == id)
    if (categories.size < initialSize) NoContent else NotFound(Json.obj("error" -> "Category not found"))
  }
}
