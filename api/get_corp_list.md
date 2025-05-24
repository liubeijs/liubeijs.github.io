
# 1、获取公司清单信息(curl 示例)

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/list' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"67fb6672450241050858e140","entry_id":"6819f2ad1775fc1eaa0173e7","fields":["name","corp_list","comment"],"filter":{"rel":"and","cond":[{"field":"name","method":"eq","value":"浏阳公路小库"}]},"limit":1}'

# 请求体

Req Body:

{
  "app_id": "67fb6672450241050858e140",
  "entry_id": "6819f2ad1775fc1eaa0173e7",
  "fields": [
    "name",
    "corp_list",
    "comment"
  ],
  "filter": {
    "rel": "and",
    "cond": [
      {
        "field": "name",
        "method": "eq",
        "value": "浏阳公路小库"
      }
    ]
  },
  "limit": 1
}


# 返回结果

{
  "data": [
    {
      "name": "浏阳公路小库",
      "corp_list": [
        {
          "_id": "6819f9eeb5eba772c2216134",
          "_widget_1746530991152": {
            "id": "6818417bca66cb3cc212a022"
          },
          "corp_name": "湖南浏北建设有限公司",
          "corp_code": "91430100MA4M76GY99",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "沙市镇赤马湖大道320号"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac5181122e",
          "_widget_1746530991152": {
            "id": "681a06c47286848a40bc7978"
          },
          "corp_name": "浏阳市教育建筑工程公司",
          "corp_code": "91430181184211370B",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "城东新村龙头湾"
          },
          "corp_type": "其它",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac5181122f",
          "_widget_1746530991152": {
            "id": "681a074a848b529599ab1e39"
          },
          "corp_name": "浏永建工集团有限公司",
          "corp_code": "91430181MA4LXPT307",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "关口办事处浏阳大道467号二楼"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811230",
          "_widget_1746530991152": {
            "id": "681a07cea64b9a1e57efde12"
          },
          "corp_name": "湖南浩途建设工程有限公司",
          "corp_code": "91430104MA4QD3XG8U",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "沙市镇建文路320号3101室"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811231",
          "_widget_1746530991152": {
            "id": "681a08aec0986c7ba664d1eb"
          },
          "corp_name": "湖南威峰建设工程有限公司",
          "corp_code": "91430181MA4R16X6XE",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "集里街道白沙中路8号2楼"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811232",
          "_widget_1746530991152": {
            "id": "681a08f91ea34be3d0dffd41"
          },
          "corp_name": "湖南省永安建筑股份有限公司",
          "corp_code": "91430000707239859H",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "浏阳大道平鼎景都小区写字楼16-19楼"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811233",
          "_widget_1746530991152": {
            "id": "681a0932fe196dd3d870d9ea"
          },
          "corp_name": "湖南银沙工程建设有限公司",
          "corp_code": "91431000097485875M",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "淮川街道办事处新北社区车站中路149号"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811234",
          "_widget_1746530991152": {
            "id": "681a09855ed070724d595819"
          },
          "corp_name": "湖南融科建设工程有限公司",
          "corp_code": "91431200MA4R8Q5130",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "永安镇永安东路95号1层101号"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811235",
          "_widget_1746530991152": {
            "id": "681a09b66ca02f8ccccf4883"
          },
          "corp_name": "浏阳市山田建筑工程有限公司",
          "corp_code": "91430181730494700L",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "淮川劳动中路121号"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811236",
          "_widget_1746530991152": {
            "id": "681a09da445508a6c4ed01ef"
          },
          "corp_name": "湖南尼塔建设发展股份有限公司",
          "corp_code": "91430104753384782Y",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "荷花街道荷兴路99号"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811237",
          "_widget_1746530991152": {
            "id": "681a0a05746878226e97e307"
          },
          "corp_name": "湖南兴进项目管理有限公司",
          "corp_code": "91430181MA4L91KW4U",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "官桥镇裕昆路202、 204号"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811238",
          "_widget_1746530991152": {
            "id": "681a0a410e33b7a5eb5ce585"
          },
          "corp_name": "湖南浏程建设工程有限公司",
          "corp_code": "91430181MA4M208Y4L",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "两型产业园"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac51811239",
          "_widget_1746530991152": {
            "id": "681a0a6f2e1b46fcbbc91a78"
          },
          "corp_name": "湖南省伍川建设工程有限公司",
          "corp_code": "91430181MA4M4RKH60",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "关口街道创意铂悦城S-7号栋201室"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac5181123a",
          "_widget_1746530991152": {
            "id": "681a0a9b08b47b13a2476f5f"
          },
          "corp_name": "湖南拓辉建设工程有限公司",
          "corp_code": "91430181MA4QCCRF05",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "浏阳经济技术开发区（高新区）永泰路创新创业园A3栋三层109-8号房"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac5181123b",
          "_widget_1746530991152": {
            "id": "681a0af90e33b7a5eb5d6545"
          },
          "corp_name": "湖南舟鑫路桥建设有限公司",
          "corp_code": "91431322MA4QAD948P",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "普迹镇新街村普官路6号102"
          },
          "corp_type": "民企",
          "corp_comment": ""
        },
        {
          "_id": "681a0b3af20fcaac5181123c",
          "_widget_1746530991152": {
            "id": "681a0b34b2f86b2ed3e79dfd"
          },
          "corp_name": "湖南恒旺建设有限公司",
          "corp_code": "91431200MA4Q7EYT8L",
          "corp_reg_place": {
            "province": "湖南省",
            "city": "长沙市",
            "district": "浏阳市",
            "detail": "浏阳经济技术开发区永龙路商业街31栋402室"
          },
          "corp_type": "民企",
          "corp_comment": ""
        }
      ],
      "comment": "",
      "_id": "6819f9eeb5eba772c2216133",
      "appId": "67fb6672450241050858e140",
      "entryId": "6819f2ad1775fc1eaa0173e7"
    }
  ]
}