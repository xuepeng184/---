<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的展示 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 品牌属性的展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      :class="{
                        'el-icon-top': isAsc,
                        'el-icon-bottom': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      :class="{
                        'el-icon-top': isAsc,
                        'el-icon-bottom': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转时记得带id -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;&nbsp;</i>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        //一二三级分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类的名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序
        order: "1:desc",
        //代表当前第几页
        pageNo: 1,
        //每一个页面展示多少数据
        pageSize: 10,
        //平台售卖属性的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    //在挂载之前获得对应的参数
    // console.log(this.$route.query)
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //在发送请求前获取参数
    this.getData();
  },
  computed: {
    ...mapGetters({
      goodsList: "search/goodsList",
    }),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    //向服务器发送请求获取search模块数据，因为不只发一次，所以封装成函数
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    //点x删除categoryName
    removeCategoryName() {
      // 点击x将categoryName,还有id变为undefined，可以不传，然后重新发请求
      this.searchParams.categoryName = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //重新跳转路由，请求栏的参数也清空了
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //点x删除keyword
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      //通知兄弟组件header组件清除关键字
      this.$bus.$emit("clear");
      //进行路由跳转
      if (this.$route.query)
        this.$router.push({ name: "search", query: this.$route.query });
    },
    //trademark事件的回调
    trademarkInfo(trademark) {
      //整理参数
      // console.log('fuzujian',trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //点x删除trademark
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //收集平台属性的回调函数
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重，重复属性不展示
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    //点x删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //排序操作
    changeOrder(flag) {
      //获得起始的order
      let originOrder = this.searchParams.order;
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      let newOrder = "";
      //点击的是综合
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    //一次尝试
    //#region
    // changeDom(flag) {
    //   this.$refs.dom2.childNodes.forEach((dom2) => {
    //     dom2.addEventListener("click", () => {
    //       this.removeActive();
    //       dom2.classList.add("active");
    //     });
    //   });
    // },
    // removeActive() {
    //   this.$refs.dom2.childNodes.forEach((panel) => {
    //     panel.classList.remove("active");
    //   });
    // },
    //#endregion
    //自定义函数的回调
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  watch: {
    //监听路由
    $route(newV, oldV) {
      //在每一次发完请求前，清除参数
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // console.log(newV,oldV)
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>