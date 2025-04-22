const express = require('express');
const router = express.Router();
const axios = require('axios');

// 简道云API配置
const API_CONFIG = {
  baseURL: 'https://api.jiandaoyun.com/api/v5',
  token: 'q1Lzhl8iknug9WFoQR2ijO1bHxZ6bwPI'
};

// 获取项目信息
router.get('/project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    
    // 构建请求参数
    const requestData = {
      app_id: "63324ce70ae4b40008f38909",
      entry_id: "64979d25210a5200083fbf9d",
      fields: ["project_id", "project_name", "project_max_price", "project_bids"],
      filter: {
        rel: "and",
        cond: [{
          field: "project_id",
          type: "text",
          method: "eq",
          value: projectId
        }]
      },
      limit: 1
    };

    // 发送请求到简道云API
    const response = await axios({
      method: 'post',
      url: `${API_CONFIG.baseURL}/app/entry/data/list`,
      headers: {
        'Authorization': `Bearer ${API_CONFIG.token}`,
        'Content-Type': 'application/json'
      },
      data: requestData
    });

    // 返回结果
    res.json(response.data);
    
  } catch (error) {
    console.error('Error fetching project data:', error);
    res.status(500).json({
      error: '获取项目信息失败',
      message: error.message
    });
  }
});

// 获取公路信用评价
router.get('/traffic-credit/:companyName', async (req, res) => {
  try {
    const companyName = req.params.companyName;
    
    // 构建请求参数
    const requestData = {
      app_id: "67fb6672450241050858e140",
      entry_id: "67fac730ed9a63fef41ccdd3",
      fields: ["corp_name", "aa_area", "aa_type", "y2022", "y2023", "y2024"],
      filter: {
        rel: "and",
        cond: [{
          field: "corp_name",
          type: "text",
          method: "eq",
          value: companyName
        }]
      },
      limit: 20
    };

    // 发送请求到简道云API
    const response = await axios({
      method: 'post',
      url: `${API_CONFIG.baseURL}/app/entry/data/list`,
      headers: {
        'Authorization': `Bearer ${API_CONFIG.token}`,
        'Content-Type': 'application/json'
      },
      data: requestData
    });

    // 返回结果
    res.json(response.data);
    
  } catch (error) {
    console.error('Error fetching traffic credit data:', error);
    res.status(500).json({
      error: '获取公路信用评价失败',
      message: error.message
    });
  }
});

module.exports = router;