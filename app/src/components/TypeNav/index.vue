<template>
  <div class="type-nav">
    <div class="container">
      <!-- 利用事件委派添加deletebacg方法 -->
      <div @mouseleave="deleteBacg()" @mouseenter="enterShow()">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 添加过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeBacg(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 这里是二三级联动 -->
                <!-- 判断是否展示二三级联动的方法 -->
                <div
                  class="item-list"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash的节流函数
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // 鼠标移入添加背景的方法
    //利用防抖进行优化
    changeBacg: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 鼠标移出去除背景并且商品分类列表隐藏
    deleteBacg() {
      this.currentIndex = -1;
      //列表隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //进行路由跳转的方法
    goSearch(event) {
      //在每个a标签加上categoryname属性，表示这是a属性
      let element = event.target;
      //通过节点的dataset属性，获得节点的自定义属性
      //解构赋值
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判断，如果路由跳转时带有params参数，也要带上
        //整理参数
        if(this.$route.params)
        location.params=this.$route.params;
        location.query = query;
        //路由跳转
        this.$router.push(location);
      }
    },

    //当鼠标移入时，让商品列表进行展示
    enterShow() {
      this.show = true;
    },
  },

  mounted() {
    //不在home组件时，使typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },

  //解构出categoryList
  computed: {
    ...mapState("home", ["categoryList"]),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过度动画样式
    //过度动画开始状态(进入)
    .sort-enter {
      height: 0;
    }
    //过度动画结束状态(进入)
    .sort-enter-to {
      height: 461px;
      overflow: hidden;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>