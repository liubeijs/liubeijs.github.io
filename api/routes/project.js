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
      fields: ["project_id", "project_name", "project_max_price", "bid_6param", "project_bids"],
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
      fields: ["corp_name", "aa_area", "aa_type", "y2021", "y2022", "y2023", "y2024"],
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

// 获取公路信用评价2
router.get('/traffic-credit2', async (req, res) => {
  try {
    const { area, type, yv } = req.query;
    
    // 初始化条件数组
    const cond = [];
    
    // 只有在参数存在时才添加对应的条件
    if (area) {
      cond.push({
        field: "aa_area",
        type: "text",
        method: "eq",
        value: area
      });
    }
    
    if (type) {
      cond.push({
        field: "aa_type",
        type: "text",
        method: "eq",
        value: type
      });
    }
    
    // 只有在 yv 参数存在时才处理年份和评价值对
    if (yv) {
      const yearValues = yv.split(',');
      for (let i = 0; i < yearValues.length; i += 2) {
        const year = yearValues[i];
        const value = yearValues[i + 1];
        if (year && value) {
          cond.push({
            field: `y${year}`,
            type: "text",
            method: "eq",
            value: value
          });
        }
      }
    }

    // 构建请求参数
    const requestData = {
      app_id: "67fb6672450241050858e140",
      entry_id: "67fac730ed9a63fef41ccdd3",
      fields: ["corp_name", "aa_area", "aa_type", "y2021", "y2022", "y2023", "y2024"],
      filter: {
        rel: "and",
        cond: cond
      },
      limit: 500
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

// 获取多家企业信息
router.get('/corps', async (req, res) => {
  try {
    const companyNames = req.query.names ? req.query.names.split(',') : [];
    
    if (!companyNames.length) {
      return res.status(400).json({
        error: '请提供企业名称',
        message: '使用 names 参数传入企业名称，多个企业名称用逗号分隔'
      });
    }

    // 构建请求参数
    const requestData = {
      app_id: "67fb6672450241050858e140",
      entry_id: "680a510711e47823ae1f678f",
      fields: ["corp_eid", "corp_name", "credit_code", "corp_addr", "corp_province", "corp_type", "comment"],
      filter: {
        rel: "and",
        cond: [{
          field: "corp_name",
          method: "eq",
          value: companyNames
        }]
      },
      limit: 100
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
    console.error('Error fetching companies data:', error);
    res.status(500).json({
      error: '获取企业信息失败',
      message: error.message
    });
  }
});

module.exports = router;