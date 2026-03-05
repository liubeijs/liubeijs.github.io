## 获取多个公司信息(curl 示例)

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/list' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"67fb6672450241050858e140","entry_id":"680a510711e47823ae1f678f","fields":["corp_eid","corp_name","credit_code","corp_addr"],"filter":{"rel":"and","cond":[{"field":"corp_name","method":"in","value":["湖南浏北建设有限公司","湖南玫塔建设有限公司","湖南浩途建设工程有限公司"]}]},"limit":200}'

## 返回结果

{
  "data": [
    {
      "_id": "6818417bca66cb3cc212a022",
      "corp_eid": "1710993622701412352",
      "corp_name": "湖南浏北建设有限公司",
      "credit_code": "91430100MA4M76GY99",
      "corp_addr": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "浏阳市",
        "detail": "浏阳市沙市镇赤马湖大道320号"
      },
      "appId": "67fb6672450241050858e140",
      "entryId": "680a510711e47823ae1f678f"
    },
    {
      "_id": "681841bb892521b58f5be424",
      "corp_eid": "1897555765260414976",
      "corp_name": "湖南玫塔建设有限公司",
      "credit_code": "91430103MACWD65H6H",
      "corp_addr": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "浏阳市",
        "detail": "长沙市浏阳经济技术开发区盛世路长沙E中心企业总部C3栋607号"
      },
      "appId": "67fb6672450241050858e140",
      "entryId": "680a510711e47823ae1f678f"
    },
    {
      "_id": "681a07cea64b9a1e57efde12",
      "corp_eid": "1710991836737409024",
      "corp_name": "湖南浩途建设工程有限公司",
      "credit_code": "91430104MA4QD3XG8U",
      "corp_addr": {
        "province": "湖南省",
        "city": "长沙市",
        "district": "浏阳市",
        "detail": "沙市镇建文路320号3101室"
      },
      "appId": "67fb6672450241050858e140",
      "entryId": "680a510711e47823ae1f678f"
    }
  ]
}