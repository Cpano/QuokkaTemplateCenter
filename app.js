var createError = require("http-errors");
var express = require("express");
const cors = require("cors")
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var manualRouter = require("./routes/manual");
var componentsRouter = require("./routes/components");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(cors({
  origin: '*' 
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Bootstrap config
app.use("/css", express.static("node_modules/bootstrap/dist/css"));
app.use("/js",express.static("node_modules/bootstrap/dist/js"));
//app.use("/js", express.static("node_modules/jquery/dist")); --No se utiliza Query


//MainRoutes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/manual", manualRouter);
app.use("/components", componentsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Listener
/*
app.listen(process.env.PORT || 3031, function () {
  console.log("Quokka Template Center running on port: 3031");
});
*/


//Server Response
app.listen(process.env.PORT || 3031, function(){
  console.log("Quokka Template Center running on port: 3031");
});


module.exports = app;
