<template>
    <div class="selector">
        <ul class="select-parents">
            <li v-for="province in datas" :key="province.label"
                class="animate-fade-in"
                @click="parentsHandle(province)">
                <a href="javascript:void(0)">{{province.label}}</a>
            </li>
        </ul>
        <transition name="childrenIn"
                    leave-active-class="animated bounceOutRight"
                    enter-active-class="animated bounceInRight">
            <ul class="select-children" v-if="province">
                <li v-for="city in province.cities" :key="city"
                    class="animate-fade-in"
                    @click="childHandle(city)">
                    <a href="javascript:void(0)">{{city}}</a>
                </li>
            </ul>
        </transition>
    </div>
</template>
<script>
    const citiesData = [
        {
            label:'上海',
            cities:["上海市"]
        },
        {
            label:'云南',
            cities:["丽江市","大理市","德宏市","文山市","昆明市","昭通市","普洱市","曲靖市","楚雄市","玉溪市","蒙自区","西双版纳"]
        },
        {
            label:'浙江',
            cities:["临海市","丽水市","义乌市","余姚市","台州市","嘉兴市","奉化市","宁波市","富阳市","嵊州市","平湖市","慈溪市","杭州市","桐乡市","武义市","永康市","江山市","温州市","湖州市","绍兴市","舟山市","衢州市","诸暨市","金华市"]
        },
        {
            label:'内蒙古',
            cities:["乌海市","包头市","呼伦贝尔市","呼和浩特市","巴彦淖尔市","赤峰市","通辽市","鄂尔多斯市","锡林浩特市","锡林郭勒市"]
        },
        {
            label:'北京',
            cities:["北京市"]
        },
        {
            label:'吉林',
            cities:["吉林市","延吉市","松原市","通化市","长春市"]
        },
        {
            label:'四川',
            cities:["乐山市","内江市","南充市","宜宾市","广元市","广安市","德阳市","成都市","攀枝花市","泸州市","眉山市","绵阳市","自贡市","资阳市","达州市","遂宁市","雅安市"]
        },
        {
            label:'天津',
            "cities":["天津市"]
        },
        {
            label:'宁夏',
            "cities":["中卫市","吴忠市","固原市","石嘴山","银川市"]
        },
        {
            label:'安徽',
            "cities":["亳州市","六安市","合肥市","安庆市","宣城市","宿州市","池州市","淮北市","淮南市","滁州市","芜湖市","蚌埠市","铜陵市","阜阳市","马鞍山市","黄山市"]
        },
        {
            label:'山东',
            "cities":["东营市","临沂市","即墨市","威海市","德州市","日照市","枣庄市","梁山市","泰安市","济南市","济宁市","淄博市","滨州市","潍坊市","烟台市","聊城市","胶州市","荣成市","荷泽市","莱芜市","邹城市","青岛市","龙口市"]
        },
        {
            label:'山西',
            "cities":["临汾市","吕梁市","大同市","太原市","忻州市","晋中市","晋城市","朔州市","运城市","长治市","阳泉市"]
        },
        {
            label:'广东',
            "cities":["东莞市","中山市","云浮市","佛山市","广州市","开平市","惠州市","揭阳市","梅州市","汕头市","江门市","河源市","深圳市","清远市","湛江市","珠海市","肇庆市","茂名市","阳江市","韶关市","鹤山"]
        },
        {
            label:'广西',
            "cities":["北海市","南宁市","来宾市","柳州市","桂林市","梧州市","河池市","玉林市","百色市","贵港市","贺州市","钦州市"]
        },
        {
            label:'新疆',
            "cities":["乌鲁木齐市","伊宁市","克拉玛依市","哈密市","喀什市","库尔勒市","昌吉市","阿克苏市"]
        },
        {
            label:'江苏',
            "cities":["南京市","南通市","太仓市","宿迁市","常州市","常熟市","张家港市","徐州市","扬州市","无锡市","昆山市","江阴市","泰州市","淮安市","盐城市","苏州市","赣榆市","连云港市","邳州市","镇江市"]
        },
        {
            label:'江西',
            "cities":["上饶市","九江市","南昌市","吉安市","宜春市","抚州市","新余市","景德镇","萍乡市","赣州市","高安市","鹰潭市"]
        },
        {
            label:'河北',
            "cities":["保定市","唐山市","廊坊市","张家口市","承德市","沧州市","石家庄市","秦皇岛市","衡水市","迁安市","邢台市","邯郸市"]
        },
        {
            label:'河南',
            "cities":["三门峡市","信阳市","南阳市","周口市","商丘市","安阳市","平顶山市","开封市","新乡市","洛阳市","济源市","漯河市","濮阳市","焦作市","许昌市","郑州市","驻马店","鹤壁市"]
        },
        {
            label:'海南',
            "cities":["三亚市","海口市"]
        },
        {
            label:'湖北',
            "cities":["仙桃市","十堰市","咸宁市","孝感市","宜昌市","恩施市","武汉市","荆州市","荆门市","襄阳市","随州市","黄冈市","黄石市"]
        },
        {
            label:'湖南',
            "cities":["吉首市","娄底市","岳阳市","常德市","张家界市","怀化市","株洲市","永州市","浏阳市","湘潭市","益阳市","衡阳市","邵阳市","郴州市","长沙市"]
        },
        {
            label:'甘肃',
            "cities":["兰州市","嘉峪关市","天水市","定西市","平凉市","庆阳市","张掖市","白银市","酒泉市"]
        },
        {
            label:'福建',
            "cities":["南平市","厦门市","宁德市","泉州市","漳州市","福州市","莆田市","龙岩市"]
        },
        {
            label:'西藏',
            "cities":["拉萨市"]
        },
        {
            label:'贵州',
            "cities":["六盘水市","兴义市","凯里市","安顺市","毕节市","贵阳市","遵义市","都匀市","铜仁市"]
        },
        {
            label:'辽宁',
            "cities":["丹东市","大连市","抚顺市","朝阳市","沈阳市","盘锦市","营口市","葫芦岛市","辽阳市","铁岭市","锦州市","阜新市","鞍山市"]
        },
        {
            label:'重庆',
            "cities":["重庆市"]
        },
        {
            label:'陕西',
            "cities":["咸阳市","商洛市","安康市","宝鸡市","延安市","榆林市","汉中市","渭南市","西安市","都匀","铜川市"]
        },
        {
            label:'青海',
            "cities":["格尔木市","西宁市"]
        },
        {
            label:'黑龙江',
            "cities":["佳木斯市","哈尔滨市","大庆市","牡丹江市","绥化市","齐齐哈尔市"]
        }
    ];
    export default {
        data() {
            return {
                datas:citiesData,
                province:undefined
            }
        },
        methods:{
            parentsHandle(province) {
                this.province = province;
            },
            childHandle(city) {
                this.$emit('selectorHide', {province:this.province.label, city:city})
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    //城市选择器
    @mixin absolute {
        position: absolute;
        width: 50%;
        height: 100%;
        right: 0;
        top: 0;
        color: #fff;
    }
    @mixin transition{
        transition: 0.3s cubic-bezier(0.76, 0.55, 0.39, 1.42) all;
    }
    .selector {
        @include absolute;
        @include transition;
        overflow: hidden;
        background: #e6e6e6;
        box-shadow: -2px 0px 4px #969696;
        .select-parents {
            @include absolute;
            width:100%;
            z-index: 5;
            overflow-x: hidden;
            box-sizing: border-box;
            padding: 10px;
        };
        .select-children {
            @include absolute;
            @include transition;
            width:60%;
            background: #d8d8d8;
            z-index: 10;
            overflow-x: hidden;
            box-sizing: border-box;
            padding: 5px;
            box-shadow: -1px 0px 4px #969696;
        }
        li {
            width: 100%;
            border-bottom: 1px solid #fff;
            a {
                display: block;
                padding: 10px;
                color: #000;
                font-size: .9rem;
            }
        }
    }
</style>