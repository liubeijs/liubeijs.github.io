# 1、获取公司信息(curl 示例)

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/list' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"67fb6672450241050858e140","entry_id":"680a510711e47823ae1f678f","fields":["corp_eid","corp_name","credit_code","corp_addr","corp_province","corp_type","comment"],"filter":{"rel":"and","cond":[{"field":"corp_name","method":"eq","value":["湖南浏北建设有限公司","湖南玫塔建设有限公司"]}]},"limit":100}'

## 返回结果

{
  "data": [
    {
      "corp_eid": "00001",
      "corp_name": "湖南浏北建设有限公司",
      "credit_code": "91430100MA4M76GY99",
      "corp_addr": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "浏阳市",
        "detail": ""
      },
      "corp_province": "",
      "corp_type": "民企",
      "comment": "",
      "_id": "6818417bca66cb3cc212a022",
      "appId": "67fb6672450241050858e140",
      "entryId": "680a510711e47823ae1f678f"
    },
    {
      "corp_eid": "00002",
      "corp_name": "湖南玫塔建设有限公司",
      "credit_code": "91430103MACWD65H6H",
      "corp_addr": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "浏阳市",
        "detail": ""
      },
      "corp_province": "",
      "corp_type": "民企",
      "comment": "",
      "_id": "681841bb892521b58f5be424",
      "appId": "67fb6672450241050858e140",
      "entryId": "680a510711e47823ae1f678f"
    }
  ]
}

# 2、创建公司信息(curl 示例)

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/create' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"67fb6672450241050858e140","entry_id":"680a510711e47823ae1f678f","data":{"corp_name":{"value":"湖南浏北建设有限公司"},"credit_code":{"value":""},"corp_type":{"value":"民企"},"comment":{"value":""},"corp_addr":{"value":{"province":"湖南省","city":"长沙市","district":"浏阳市","detail":""}}}}'

## 返回结果

{
  "data": {
    "creator": {
      "name": "李洁信",
      "username": "jdy-qocgo6mx7l23",
      "status": 1,
      "type": 0,
      "departments": [
        4
      ]
    },
    "updater": {
      "name": "李洁信",
      "username": "jdy-qocgo6mx7l23",
      "status": 1,
      "type": 0,
      "departments": [
        4
      ]
    },
    "deleter": null,
    "createTime": "2025-05-05T06:05:59.506Z",
    "updateTime": "2025-05-05T06:05:59.506Z",
    "deleteTime": null,
    "corp_eid": "00005",
    "corp_name": "湖南浏北建设有限公司",
    "credit_code": "",
    "corp_addr": {
      "province": "湖南省",
      "city": "长沙市",
      "district": "浏阳市",
      "detail": ""
    },
    "corp_province": "",
    "corp_type": "民企",
    "attachments": [],
    "comment": "",
    "tag": "",
    "json": "",
    "_id": "68185547249b80b2e22b52e3",
    "appId": "67fb6672450241050858e140",
    "entryId": "680a510711e47823ae1f678f"
  }
}

# 3、更新公司信息(curl 示例)

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/update' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"67fb6672450241050858e140","entry_id":"680a510711e47823ae1f678f","data_id":"68185547249b80b2e22b52e3","data":{"corp_name":{"value":"湖南浏北"},"credit_code":{"value":"XXXXX"},"corp_addr":{"value":{"province":"湖南省","city":"长沙市","district":"浏阳市","detail":""}},"corp_type":{"value":"民企"},"comment":{"value":"api updated."}}}'

## 返回结果

{
  "app_id": "67fb6672450241050858e140",
  "entry_id": "680a510711e47823ae1f678f",
  "data_id": "68185547249b80b2e22b52e3",
  "data": {
    "corp_name": {
      "value": "湖南浏北"
    },
    "credit_code": {
      "value": "XXXXX"
    },
    "corp_addr": {
      "value": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "浏阳市",
        "detail": ""
      }
    },
    "corp_type": {
      "value": "民企"
    },
    "comment": {
      "value": "api updated."
    }
  }
}