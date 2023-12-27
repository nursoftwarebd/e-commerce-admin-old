const router = require("express").Router();
const {
  getAllAttribute,
  getSingleAttribute,
  singleCreateAttribute,
  singleUpdateAttribute,
  singleDeleteAttribute,
  singleUpdateAttributeVariant,
  singleDeleteAttributeVariant,
  singleCreateAttributeVariant,
  singleUpdateAttributeStatus,
  singleUpdateAttributeVariantStatus,
} = require("../controllers/attributeController");

// attribute create and get
router.route("/").get(getAllAttribute).post(singleCreateAttribute);

// attribute by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleAttribute)
  .put(singleUpdateAttribute)
  .delete(singleDeleteAttribute);

// show/hide a attribute
router.put("/status/:id", singleUpdateAttributeStatus);

// single update attribute variant status
router.put("/single/variant/status/:id", singleUpdateAttributeVariantStatus);

// attribute variant create, update, and delete
router
  .route("/single/variant/:id")
  .post(singleCreateAttributeVariant)
  .put(singleUpdateAttributeVariant)
  .delete(singleDeleteAttributeVariant);

module.exports = router;
