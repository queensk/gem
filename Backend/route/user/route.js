import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
} from "../../controllers/user/controllers.js";
import {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../../controllers/Portfolio/portfolio.js";
import {
  getPortfolioItems,
  getPortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../../controllers/PortfolioItems/controller.js";
import {
  getFollowers,
  getFollowersByFollowerID,
  getFollowersByFollowingID,
  createFollower,
  deleteFollower,
} from "../../controllers/Followers/controller.js";
import {
  getLikes,
  getLikesByUserID,
  getLikesByItemID,
  createLike,
  deleteLike,
} from "../../controllers/Likes/controller.js";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from "../../controllers/Comments/controller.js";
import {
  getAllTags,
  // getTag,
  createTag,
  updateTag,
  deleteTag,
} from "../../controllers/Tags/controller.js";
import {
  // getTagsByItemID,
  // getPortfolioItemTags,
  createPortfolioItemTag,
  deletePortfolioItemTag,
} from "../../controllers/PortfolioItemTags/controller.js";
import {
  getAvailability,
  getAvailabilityByUserID,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../../controllers/Availability/controller.js";
import {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../../controllers/Purchases/controller.js";
import { requireLogin } from "../../middleware/authMiddleware.js";
import {
  authLogin,
  authPasswordReset,
  authRegister,
} from "../../controllers/auth/authController.js";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getUserMessages,
  patchMessage,
  updateMessage,
} from "../../controllers/userMessages/controllers.js";
import { getUsersWhoSentMessagesToUser } from "../../controllers/UsersWhoSentMessagesToUser/constroller.js";
import { searchUsersByName } from "../../controllers/search/controller.js";
import {
  createProfileLike,
  deleteProfileLike,
  getProfileLikes,
  getProfileLikesByLikeID,
  getProfileLikesByLikingID,
} from "../../controllers/ProfileLikes/controller.js";

export const appRoutes = (app) => {
  app
    .route("/users")
    .get(requireLogin, getUsers)
    .post(requireLogin, createUser);

  app
    .route("/users/:id")
    .get(requireLogin, getUser)
    .put(requireLogin, updateUser)
    .patch(requireLogin, patchUser)
    .delete(requireLogin, deleteUser);

  app
    .route("/portfolio")
    .get(requireLogin, getPortfolio)
    .post(requireLogin, createPortfolio);

  app
    .route("/portfolio/:id")
    .get(requireLogin, getPortfolioById)
    .put(requireLogin, updatePortfolio)
    .delete(requireLogin, deletePortfolio);

  app
    .route("/portfolioItems")
    .get(requireLogin, getPortfolioItems)
    .post(requireLogin, createPortfolioItem);
  app
    .route("/portfolioItems/:id")
    .get(requireLogin, getPortfolioItem)
    .put(requireLogin, updatePortfolioItem)
    .delete(requireLogin, deletePortfolioItem);

  app
    .route("/followers")
    .get(requireLogin, getFollowers)
    .post(requireLogin, createFollower);
  app
    .route("/followers/:id")
    .get(requireLogin, getFollowersByFollowerID)
    .delete(requireLogin, deleteFollower);

  app
    .route("/profileLike")
    .get(requireLogin, getProfileLikes)
    .post(requireLogin, createProfileLike);
  app
    .route("/profileLike/:id")
    .get(requireLogin, getProfileLikesByLikeID)

    .delete(requireLogin, deleteProfileLike);
  app
    .route("/profileLikesCount/:id")
    .get(requireLogin, getProfileLikesByLikingID);

  app
    .route("/likes")
    .get(requireLogin, getLikes)
    .post(requireLogin, createLike);
  app.route("/likes/user/:userID").get(requireLogin, getLikesByUserID);
  app.route("/likes/item/:itemID").get(requireLogin, getLikesByItemID);
  app.route("/likes/:userID/:itemID").delete(requireLogin, deleteLike);

  app
    .route("/comments")
    .get(requireLogin, getComments)
    .post(requireLogin, createComment);
  app
    .route("/comments/:commentID")
    .get(requireLogin, getComment)
    .put(requireLogin, updateComment)
    .delete(requireLogin, deleteComment);

  app
    .route("/tags")
    .get(requireLogin, getAllTags)
    .post(requireLogin, createTag);
  app
    .route("/tags/:tagID")
    .put(requireLogin, updateTag)
    .delete(requireLogin, deleteTag);

  app.route("/portfolioItemTags").post(requireLogin, createPortfolioItemTag);
  app
    .route("/portfolioItemTags/:itemID/:tagID")
    .delete(requireLogin, deletePortfolioItemTag);

  app
    .route("/availability")
    .get(requireLogin, getAvailability)
    .post(requireLogin, createAvailability);
  app
    .route("/availability/user/:userID")
    .get(requireLogin, getAvailabilityByUserID);
  app
    .route("/availability/:availabilityID")
    .put(requireLogin, updateAvailability)
    .delete(requireLogin, deleteAvailability);

  app
    .route("/purchases")
    .get(requireLogin, requireLogin, getPurchases)
    .post(requireLogin, requireLogin, createPurchase);
  app
    .route("/purchases/:purchaseID")
    .get(requireLogin, getPurchase)
    .put(requireLogin, updatePurchase)
    .delete(requireLogin, deletePurchase);

  app.route("/auth/register").post(authRegister);
  app.route("/auth/login").post(authLogin);
  app.route("/auth/password/reset/:id").patch(authPasswordReset);

  app
    .route("/message/user")
    .get(requireLogin, getAllMessages)
    .post(requireLogin, createMessage);
  app
    .route("/message/user/:id")
    .get(requireLogin, getUserMessages)
    .put(requireLogin, updateMessage)
    .delete(requireLogin, deleteMessage)
    .patch(requireLogin, patchMessage);

  app
    .route("/message/user/:id/sent")
    .get(requireLogin, getUsersWhoSentMessagesToUser);

  app.route("/user/search").post(requireLogin, searchUsersByName);
};
