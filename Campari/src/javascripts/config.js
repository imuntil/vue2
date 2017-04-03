/**
 * Created by 斌 on 2017/3/13.
 */
const BASE_PATH = 'http://115.28.239.3:8080/campariShop_Api/';
const IMG_PATH = 'http://115.28.239.3:8080/campariShop/upload/';
export default {

    path: BASE_PATH,
    imgPath: IMG_PATH,
    avatarPath: BASE_PATH + 'upload/',
    dev:true,
    testData:[
        {proprice:1131,englishname:'noxxx',proname:'茅台',procontent:'700', id:1},
        {proprice:11111,englishname:'noxxx',proname:'茅台',procontent:'700', id:2},
        {proprice:2111,englishname:'noxxx',proname:'茅台',procontent:'700', id:3},
        {proprice:1131,englishname:'noxxx',proname:'茅台',procontent:'700', id:4},
        {proprice:111,englishname:'noxxx',proname:'茅台',procontent:'700', id:5},
        {proprice:1114,englishname:'noxxx',proname:'茅台',procontent:'700', id:6},
        {proprice:1151,englishname:'noxxx',proname:'茅台',procontent:'700', id:7},
        {proprice:1141,englishname:'noxxx',proname:'茅台',procontent:'700', id:8},
        {proprice:111,englishname:'noxxx',proname:'茅台',procontent:'700', id:9},
        {proprice:1811,englishname:'noxxx',proname:'茅台',procontent:'700', id:10},
        {proprice:9111,englishname:'noxxx',proname:'茅台',procontent:'700', id:11},
        {proprice:1011,englishname:'noxxx',proname:'茅台',procontent:'700', id:12},
        {proprice:1191,englishname:'noxxx',proname:'茅台',procontent:'700', id:13},
    ],
    simUserData:{
        name:'zhin',
        phone:'13022163937',
        userid:3,
        avatar:'3.png',
    },
    testOrderData:[
        {
            ordernum:'13745933347530',
            total:'2',
            orderprice:'100',
            orderstatus:0,
            orderaddress:'上海换头可靠连接方式',
            status:{
                s:'未支付',
                c:'red',
                o:'去支付'
            },
            products:[
                {price:1131,englishname:'noxxx',proname:'茅台',procontent:'700', id:1, num:1},
                {price:1131,englishname:'noxxx',proname:'茅台',procontent:'700', id:2, num:1},
            ]
        },
        {
            ordernum:'13745932317530',
            total:'2',
            orderprice:'1001',
            orderstatus:1,
            orderaddress:'上海宝三',
            status:{
                s:'已支付',
                c:'red',
                o:'查看物流'
            },
            products:[
                {price:118,englishname:'noxxx',proname:'茅台',procontent:'700', id:2, num:1},
                {price:131,englishname:'noxxx',proname:'茅台',procontent:'700', id:1, num:1},
            ]
        },
        {
            ordernum:'1297927952409',
            total:'1',
            orderprice:'100',
            orderstatus:0,
            orderaddress:'上海换头可靠连接方式',
            status:{
                s:'未支付',
                c:'red',
                o:'去支付'
            },
            products:[
                {price:1131,englishname:'noxxx',proname:'茅台',procontent:'700', id:1, num:1},
            ]
        },
        {
            ordernum:'12380170918',
            total:'3',
            orderprice:'1001',
            orderstatus:1,
            orderaddress:'上海宝三',
            status:{
                s:'已支付',
                c:'red',
                o:'查看物流'
            },
            products:[
                {price:118,englishname:'noxxx',proname:'茅台',procontent:'700', id:2, num:1},
                {price:131,englishname:'noxxx',proname:'茅台',procontent:'700', id:1, num:1},
                {price:1131,englishname:'noxxx',proname:'茅台',procontent:'700', id:2, num:1},
            ]
        }
    ]
}