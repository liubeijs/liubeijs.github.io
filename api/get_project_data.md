# 获取项目信息接口示例（使用curl语法描述）

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/list' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"63324ce70ae4b40008f38909","entry_id":"64979d25210a5200083fbf9d","fields":["project_id","project_name", "project_pub_url", "project_max_price", "bid_6param", "project_bids"],"filter":{"rel":"and","cond":[{"field":"project_id","type":"text","method":"eq","value":"01923"}]},"limit":1}'


# 返回结果

{
  "data": [
    {
      "project_id": "01923",
      "project_name": "双峰高新区人才服务中心建设项目",
      "project_max_price": 4089640.11,
      "project_bids": [
        {
          "_id": "67ff4e566dde663c32949960",
          "bid_id": 1,
          "bid_corp_name": "湖南省云阳建设工程有限公司",
          "bid_corp_code": "91430224597576538B",
          "bid_price": 3611981.78,
          "bid_down_ratio": 0.1168,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949961",
          "bid_id": 2,
          "bid_corp_name": "湖南倍盈建筑工程有限公司",
          "bid_corp_code": "914300000897018147",
          "bid_price": 3587810.4,
          "bid_down_ratio": 0.1227,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949962",
          "bid_id": 3,
          "bid_corp_name": "湖南娄底路桥建设有限责任公司",
          "bid_corp_code": "91431300730533108L",
          "bid_price": 3680676.09,
          "bid_down_ratio": 0.1,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949963",
          "bid_id": 4,
          "bid_corp_name": "长沙定成工程项目管理有限公司",
          "bid_corp_code": "91430121396857018Y",
          "bid_price": null,
          "bid_down_ratio": 1,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949964",
          "bid_id": 5,
          "bid_corp_name": "京兴美建设工程有限公司",
          "bid_corp_code": "91430000748359435W",
          "bid_price": 3851214.09,
          "bid_down_ratio": 0.0583,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949965",
          "bid_id": 6,
          "bid_corp_name": "湖南省坤勇建筑工程有限公司",
          "bid_corp_code": "91430181MA4Q97K46Y",
          "bid_price": 3602209.63,
          "bid_down_ratio": 0.1192,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949966",
          "bid_id": 7,
          "bid_corp_name": "闽晟集团城建发展有限公司",
          "bid_corp_code": "91350400662826653X",
          "bid_price": 3811546.49,
          "bid_down_ratio": 0.068,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949967",
          "bid_id": 8,
          "bid_corp_name": "湖南铧广建设有限公司",
          "bid_corp_code": "91430124MA4QA0G8XW",
          "bid_price": 3746110.38,
          "bid_down_ratio": 0.084,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949968",
          "bid_id": 9,
          "bid_corp_name": "湖南省湘钧建设有限公司",
          "bid_corp_code": "914300007389938971",
          "bid_price": 3551842.27,
          "bid_down_ratio": 0.1315,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949969",
          "bid_id": 10,
          "bid_corp_name": "湖南中房雄宇建筑工程有限公司",
          "bid_corp_code": "91431321750613471U",
          "bid_price": 3353398.96,
          "bid_down_ratio": 0.18,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294996a",
          "bid_id": 11,
          "bid_corp_name": "湖南铂尚建设工程有限公司",
          "bid_corp_code": "91431000760725434Y",
          "bid_price": 3816452.15,
          "bid_down_ratio": 0.0668,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294996b",
          "bid_id": 12,
          "bid_corp_name": "湖南新康建设集团有限公司",
          "bid_corp_code": "914313227580092953",
          "bid_price": 3481101.66,
          "bid_down_ratio": 0.1488,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294996c",
          "bid_id": 13,
          "bid_corp_name": "湖南弘运建筑有限公司",
          "bid_corp_code": "91430122MA4L4H0E66",
          "bid_price": 3650476.28,
          "bid_down_ratio": 0.1074,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294996d",
          "bid_id": 14,
          "bid_corp_name": "湖南省泰道市政建设工程有限公司",
          "bid_corp_code": "91431000MA4PMQ3075",
          "bid_price": 3593566.75,
          "bid_down_ratio": 0.1213,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294996e",
          "bid_id": 15,
          "bid_corp_name": "湖南拓欧建设工程有限公司",
          "bid_corp_code": "91430100MA4TDKUE1P",
          "bid_price": 3612829.94,
          "bid_down_ratio": 0.1166,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294996f",
          "bid_id": 16,
          "bid_corp_name": "湖南佩雅建筑工程有限公司",
          "bid_corp_code": "91430104MA7J56860C",
          "bid_price": 3272516.53,
          "bid_down_ratio": 0.1998,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949970",
          "bid_id": 17,
          "bid_corp_name": "娄底工程建设有限公司",
          "bid_corp_code": "91431300776779912D",
          "bid_price": 3652866.55,
          "bid_down_ratio": 0.1068,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949971",
          "bid_id": 18,
          "bid_corp_name": "永州市市政工程有限公司",
          "bid_corp_code": "91431100727942568B",
          "bid_price": 3837718.27,
          "bid_down_ratio": 0.0616,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949972",
          "bid_id": 19,
          "bid_corp_name": "江西同耀建设工程有限公司",
          "bid_corp_code": "91360900309271941M",
          "bid_price": 3668807.96,
          "bid_down_ratio": 0.1029,
          "bid_stat": "第二候选人",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949973",
          "bid_id": 20,
          "bid_corp_name": "湖南勤业建筑工程有限公司",
          "bid_corp_code": "914302006828155218",
          "bid_price": 3443465.68,
          "bid_down_ratio": 0.158,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949974",
          "bid_id": 21,
          "bid_corp_name": "湖南建基项目管理有限公司",
          "bid_corp_code": "91431100053899478B",
          "bid_price": 3727290.47,
          "bid_down_ratio": 0.0886,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949975",
          "bid_id": 22,
          "bid_corp_name": "湖南省宏星建筑工程有限公司",
          "bid_corp_code": "914313021875198138",
          "bid_price": 3644065.9,
          "bid_down_ratio": 0.109,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949976",
          "bid_id": 23,
          "bid_corp_name": "湖南米球建设有限公司",
          "bid_corp_code": "91430602MA4L6UCM4X",
          "bid_price": 3529318.65,
          "bid_down_ratio": 0.137,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949977",
          "bid_id": 24,
          "bid_corp_name": "湖南天际岭建设工程有限公司",
          "bid_corp_code": "91430103MA4LKT2E9F",
          "bid_price": 3631327.81,
          "bid_down_ratio": 0.1121,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949978",
          "bid_id": 25,
          "bid_corp_name": "湖南省桂诚建设工程有限公司",
          "bid_corp_code": "914313007558356631",
          "bid_price": 3328967.05,
          "bid_down_ratio": 0.186,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949979",
          "bid_id": 26,
          "bid_corp_name": "湖南祥路建设工程有限公司",
          "bid_corp_code": "91430111MA4P7NJ41P",
          "bid_price": 3607038.81,
          "bid_down_ratio": 0.118,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294997a",
          "bid_id": 27,
          "bid_corp_name": "娄底市鸿湖工程建设有限公司",
          "bid_corp_code": "91431300MA4M89W65C",
          "bid_price": null,
          "bid_down_ratio": 1,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294997b",
          "bid_id": 28,
          "bid_corp_name": "四川仁禄建设工程有限公司",
          "bid_corp_code": "91510100MA6CL9BK1N",
          "bid_price": 3685215.59,
          "bid_down_ratio": 0.0989,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294997c",
          "bid_id": 29,
          "bid_corp_name": "湖南宏成建设工程有限公司",
          "bid_corp_code": "91430500064241700W",
          "bid_price": 3618922.52,
          "bid_down_ratio": 0.1151,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294997d",
          "bid_id": 30,
          "bid_corp_name": "湖南教建集团有限公司",
          "bid_corp_code": "91430000183964645H",
          "bid_price": 3688855.37,
          "bid_down_ratio": 0.098,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294997e",
          "bid_id": 31,
          "bid_corp_name": "湖南高成项目管理有限公司",
          "bid_corp_code": "91430100085415116Y",
          "bid_price": 3688032.45,
          "bid_down_ratio": 0.0982,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294997f",
          "bid_id": 32,
          "bid_corp_name": "衡阳县第二建筑工程公司",
          "bid_corp_code": "91430421185280853N",
          "bid_price": null,
          "bid_down_ratio": 1,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949980",
          "bid_id": 33,
          "bid_corp_name": "湖南志航项目管理有限公司",
          "bid_corp_code": "914301003205621925",
          "bid_price": 3603785.86,
          "bid_down_ratio": 0.1188,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949981",
          "bid_id": 34,
          "bid_corp_name": "福建鑫盛建设有限公司",
          "bid_corp_code": "91350400685057578A",
          "bid_price": 3709303.58,
          "bid_down_ratio": 0.093,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949982",
          "bid_id": 35,
          "bid_corp_name": "湖南巨盛建设工程有限公司",
          "bid_corp_code": "914313003447149040",
          "bid_price": 3476190.08,
          "bid_down_ratio": 0.15,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949983",
          "bid_id": 36,
          "bid_corp_name": "中南水务工程有限公司",
          "bid_corp_code": "91430100717074015G",
          "bid_price": 3809090.41,
          "bid_down_ratio": 0.0686,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949984",
          "bid_id": 37,
          "bid_corp_name": "湖南金辉建设集团有限公司",
          "bid_corp_code": "914300007279476331",
          "bid_price": 3666796.46,
          "bid_down_ratio": 0.1034,
          "bid_stat": "第一候选人",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949985",
          "bid_id": 38,
          "bid_corp_name": "湖南省翔宇建设集团有限公司",
          "bid_corp_code": "91431300750619339Q",
          "bid_price": 3522815.99,
          "bid_down_ratio": 0.1386,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949986",
          "bid_id": 39,
          "bid_corp_name": "湖南望云建设有限公司",
          "bid_corp_code": "914300003953404123",
          "bid_price": 3521180.13,
          "bid_down_ratio": 0.139,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949987",
          "bid_id": 40,
          "bid_corp_name": "湖南省一建园林建设有限公司",
          "bid_corp_code": "91430100780891771K",
          "bid_price": 3610334.49,
          "bid_down_ratio": 0.1172,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949988",
          "bid_id": 41,
          "bid_corp_name": "湖南祥泰园林建设有限公司",
          "bid_corp_code": "91430104MA4L5A0U3D",
          "bid_price": 3685992.63,
          "bid_down_ratio": 0.0987,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949989",
          "bid_id": 42,
          "bid_corp_name": "湖南世新建筑工程有限公司",
          "bid_corp_code": "91430511185685551K",
          "bid_price": 3435293.72,
          "bid_down_ratio": 0.16,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294998a",
          "bid_id": 43,
          "bid_corp_name": "湖南鼎坤建设有限公司",
          "bid_corp_code": "914300000954253853",
          "bid_price": 3647957.87,
          "bid_down_ratio": 0.108,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294998b",
          "bid_id": 44,
          "bid_corp_name": "湖南省正邦建设工程有限公司",
          "bid_corp_code": "91430000085407458U",
          "bid_price": 3876978.82,
          "bid_down_ratio": 0.052,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294998c",
          "bid_id": 45,
          "bid_corp_name": "湖南宝利建筑工程有限公司",
          "bid_corp_code": "914305003256388031",
          "bid_price": 3394395.24,
          "bid_down_ratio": 0.17,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294998d",
          "bid_id": 46,
          "bid_corp_name": "张家口超越园林景观工程有限公司",
          "bid_corp_code": "91130701MA0820HK7A",
          "bid_price": 3697034.66,
          "bid_down_ratio": 0.096,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294998e",
          "bid_id": 47,
          "bid_corp_name": "湖南鼎庆建筑工程有限公司",
          "bid_corp_code": "91430112MA4M5H2M01",
          "bid_price": 3616053.81,
          "bid_down_ratio": 0.1158,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294998f",
          "bid_id": 48,
          "bid_corp_name": "湖南省郴州市第二建筑工程公司",
          "bid_corp_code": "91431000187761327Y",
          "bid_price": 3681085.06,
          "bid_down_ratio": 0.0999,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949990",
          "bid_id": 49,
          "bid_corp_name": "湖南百燕建设工程有限公司",
          "bid_corp_code": "91430600399327055L",
          "bid_price": 3465969.99,
          "bid_down_ratio": 0.1525,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949991",
          "bid_id": 50,
          "bid_corp_name": "湖南省鑫泰利项目管理有限公司",
          "bid_corp_code": "91431103MA4RC5G692",
          "bid_price": 3644621.27,
          "bid_down_ratio": 0.1088,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949992",
          "bid_id": 51,
          "bid_corp_name": "湖南湘水路桥建设有限公司",
          "bid_corp_code": "91431000MA4L3LWD7G",
          "bid_price": 3979634.28,
          "bid_down_ratio": 0.0269,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949993",
          "bid_id": 52,
          "bid_corp_name": "河南港津建筑工程有限公司",
          "bid_corp_code": "91411100397252192K",
          "bid_price": 3157389.26,
          "bid_down_ratio": 0.228,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949994",
          "bid_id": 53,
          "bid_corp_name": "湖南昱诚项目管理有限公司",
          "bid_corp_code": "9143000039534785X4",
          "bid_price": 3670855.96,
          "bid_down_ratio": 0.1024,
          "bid_stat": "第三候选人",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949995",
          "bid_id": 54,
          "bid_corp_name": "郴州华程建设工程有限公司",
          "bid_corp_code": "91431000062246292A",
          "bid_price": 3606244.64,
          "bid_down_ratio": 0.1182,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949996",
          "bid_id": 55,
          "bid_corp_name": "新卓为（湖南）装饰设计工程有限公司",
          "bid_corp_code": "91430100097482308E",
          "bid_price": 2862926.03,
          "bid_down_ratio": 0.3,
          "bid_stat": "废标",
          "bid_comment": "1.5 在形式评审、资格评审、响应性评审中，评标委员会认定投标文件不符合评标办法前附表规定的任何一项评审标准的；符合招标文件要求"
        },
        {
          "_id": "67ff4e566dde663c32949997",
          "bid_id": 56,
          "bid_corp_name": "湖南兴越建设工程有限公司",
          "bid_corp_code": "91431026MA4LBXU8XE",
          "bid_price": 3504821.57,
          "bid_down_ratio": 0.143,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949998",
          "bid_id": 57,
          "bid_corp_name": "湖南省德星建设有限公司",
          "bid_corp_code": "914313000980405874",
          "bid_price": 3573118.6,
          "bid_down_ratio": 0.1263,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c32949999",
          "bid_id": 58,
          "bid_corp_name": "湖南火星建筑工程有限公司",
          "bid_corp_code": "91430103MA4L2RPT4Q",
          "bid_price": 3341235.97,
          "bid_down_ratio": 0.183,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294999a",
          "bid_id": 59,
          "bid_corp_name": "湖南华杰建设工程有限公司",
          "bid_corp_code": "91431100MA4LBWGQ5E",
          "bid_price": 3711348.56,
          "bid_down_ratio": 0.0925,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294999b",
          "bid_id": 60,
          "bid_corp_name": "湖南天平建设工程有限公司",
          "bid_corp_code": "91430112MA4RERQJXE",
          "bid_price": 3721572.13,
          "bid_down_ratio": 0.09,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294999c",
          "bid_id": 61,
          "bid_corp_name": "湖南恒安工程有限公司",
          "bid_corp_code": "91431300685012847P",
          "bid_price": 3608698.43,
          "bid_down_ratio": 0.1176,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294999d",
          "bid_id": 62,
          "bid_corp_name": "湖南帆顺建设工程有限公司",
          "bid_corp_code": "91430900MA4L19XU9X",
          "bid_price": 3591465.15,
          "bid_down_ratio": 0.1218,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294999e",
          "bid_id": 63,
          "bid_corp_name": "坤海建设工程有限公司",
          "bid_corp_code": "91510100MA6CLJ1D8E",
          "bid_price": 3508911.21,
          "bid_down_ratio": 0.142,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c3294999f",
          "bid_id": 64,
          "bid_corp_name": "湖南雁城建设工程有限公司",
          "bid_corp_code": "914304071851658129",
          "bid_price": 3566177.84,
          "bid_down_ratio": 0.128,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c329499a0",
          "bid_id": 65,
          "bid_corp_name": "邵阳市万成建设工程有限公司",
          "bid_corp_code": "914305001855245987",
          "bid_price": 3644687.26,
          "bid_down_ratio": 0.1088,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c329499a1",
          "bid_id": 66,
          "bid_corp_name": "湖南省华舜建筑工程有限公司",
          "bid_corp_code": "91431100MA4RHBY40A",
          "bid_price": 3700711.83,
          "bid_down_ratio": 0.0951,
          "bid_stat": "",
          "bid_comment": ""
        },
        {
          "_id": "67ff4e566dde663c329499a2",
          "bid_id": 67,
          "bid_corp_name": "湖南荣畅项目管理有限公司",
          "bid_corp_code": "91431100MA4L201J66",
          "bid_price": 3726480.07,
          "bid_down_ratio": 0.0888,
          "bid_stat": "",
          "bid_comment": ""
        }
      ],
      "_id": "67e1093c92ce0257ee13c807",
      "appId": "63324ce70ae4b40008f38909",
      "entryId": "64979d25210a5200083fbf9d"
    }
  ]
}