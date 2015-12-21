import fs from "fs";

import _ from "lodash";

import gulp from "gulp";

import consolidate from "gulp-consolidate";
import iconfont from "gulp-iconfont";
import jade from "gulp-jade";
import watch from "gulp-watch";

const pkg = JSON.parse(fs.readFileSync("./package.json"));

const runTimestamp = Math.round(Date.now() / 1000),
  LD = "./dist/visicons.ld.json";


gulp.task("fonts", () => {
  return gulp.src(["./src/icons/*.svg"])
    .pipe(iconfont(_.extend({
        fontName: pkg.name,
        timestamp: runTimestamp
      }, pkg.iconfont)))
    .on("glyphs", (glyphs, options) => {
      // TODO: ensure dist
      let stream = fs.createWriteStream(LD, {flags: "w+"});
        stream.once('open', function(fd) {
          stream.write(JSON.stringify({glyphs, options}, null, 2));
          stream.end();
        });

      gulp.src('./src/css/visicons.css')
        .pipe(consolidate('lodash', _.extend({
          fontName: pkg.name,
          glyphs: glyphs
        }, pkg.iconfontCss)))
        .pipe(gulp.dest('./dist/css/'));
    })
    .pipe(gulp.dest("./dist/fonts/"));
});


gulp.task("docs", function() {
  let font = JSON.parse(fs.readFileSync(LD));

  gulp.src("./src/jade/*.jade")
    .pipe(jade({
      locals: {font, pkg}
    }))
    .pipe(gulp.dest("./dist/"))
});


gulp.task("default", ["fonts", "docs"]);
