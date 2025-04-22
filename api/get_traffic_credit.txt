# 获取公司的公路信用评价接口示例（使用curl语法描述）

curl --location 'https://api.jiandaoyun.com/api/v5/app/entry/data/list' \
--header 'Authorization: Bearer q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI' \
--header 'Content-Type: application/json' \
--data '{"app_id":"67fb6672450241050858e140","entry_id":"67fac730ed9a63fef41ccdd3","fields":["corp_name","aa_area","aa_type","y2022","y2023","y2024"],"filter":{"rel":"and","cond":[{"field":"corp_name","type":"text","method":"eq","value":"衡阳公路桥梁建设有限公司"}]},"limit":20}'

# 返回结果

{
  "data": [
    {
      "corp_name": "衡阳公路桥梁建设有限公司",
      "aa_area": "全国",
      "aa_type": "公路水运",
      "y2022": "AA",
      "y2023": "AA",
      "y2024": "",
      "_id": "67fea268046cb528f80dfb1d",
      "appId": "67fb6672450241050858e140",
      "entryId": "67fac730ed9a63fef41ccdd3"
    },
    {
      "corp_name": "衡阳公路桥梁建设有限公司",
      "aa_area": "湖南省",
      "aa_type": "公路水运",
      "y2022": "AA",
      "y2023": "AA",
      "y2024": "AA",
      "_id": "6805c6b96c17d859f70c5750",
      "appId": "67fb6672450241050858e140",
      "entryId": "67fac730ed9a63fef41ccdd3"
    }
  ]
}