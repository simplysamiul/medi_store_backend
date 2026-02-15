"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var medicine_router_1 = require("./modules/medicine/medicine.router");
var category_route_1 = require("./modules/category/category.route");
var review_router_1 = require("./modules/review/review.router");
var node_1 = require("better-auth/node");
var auth_1 = require("./lib/auth");
var user_router_1 = require("./modules/user/user.router");
var order_router_1 = require("./modules/order/order.router");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
// user authentication route from better auth
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
// root route
app.get("/", function (req, res) {
    res.send("Welcome to MediStore Backend!");
});
// medicine routes
app.use("/api/medicines", medicine_router_1.default);
// categories route
app.use("/api/categories", category_route_1.CategoryRouter);
// reviews route
app.use("/api/review", review_router_1.ReviewRoutes);
// user route
app.use("/api/users", user_router_1.userRouter);
// order route
app.use("/api/orders", order_router_1.orderRouter);
exports.default = app;
