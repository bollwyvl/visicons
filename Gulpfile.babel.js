import fs from "fs";

import _ from "lodash";

import gulp from "gulp";

import consolidate from "gulp-consolidate";
import iconfont from "gulp-iconfont";
import jade from "gulp-jade";
import watch from "gulp-watch";
// import data from "gulp-data";

const pkg = JSON.parse(fs.readFileSync("./package.json"));

const runTimestamp = Math.round(Date.now() / 1000),
  LD = "./dist/visicons.ld.json";

gulp.task("fonts", (cb) => {
  gulp.src("./src/icons/*.svg")
    .pipe(iconfont(_.extend({
        fontName: pkg.name,
        timestamp: runTimestamp
      }, pkg.iconfont)))
    .on("glyphs", (glyphs, options) => {
      let stream = fs.createWriteStream(LD, {flags: "w+"});
        stream.once("open", function(fd) {
          stream.write(JSON.stringify({glyphs, options}, null, 2));
          stream.end();

          gulp.src("./src/css/visicons.css")
            .pipe(consolidate("lodash", _.extend({
              fontName: pkg.name,
              glyphs: _.sortBy(glyphs, "name")
            }, pkg.iconfontCss)))
            .pipe(gulp.dest("./dist/visicons/css/"))
            .on("end", ()=> cb());

        });
    })
    .pipe(gulp.dest("./dist/visicons/fonts/"));
});


gulp.task("docs", ["fonts", "copy"], () => {
  let font = JSON.parse(fs.readFileSync(LD));

  font.glyphs = _.sortBy(font.glyphs, "name");

  gulp.src("./src/jade/*.jade")
    .pipe(jade({
      locals: {font, pkg}
    }))
    .pipe(gulp.dest("./dist/"))
});


gulp.task("copy", () => {
  gulp.src(["LICENSE", "CONTRIBUTORS"]).pipe(gulp.dest("./dist/"));
});


gulp.task("default", ["docs"]);
