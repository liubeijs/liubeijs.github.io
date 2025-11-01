// 示例数据：用户故事（12条），供首页瀑布流与详情页共用
// 资源来自 src/assets/images

import feed1 from '../assets/images/feed1.png'
import feed2 from '../assets/images/feed2.png'
import feed3 from '../assets/images/feed3.png'
import feed4 from '../assets/images/feed4.png'
import last1 from '../assets/images/last1.jpeg'
import last2 from '../assets/images/last2.jpeg'
import last3 from '../assets/images/last3.jpeg'
import last4 from '../assets/images/last4.jpeg'

import avator0 from '../assets/images/avator.jpg'
import avator1 from '../assets/images/avator1.png'
import avator2 from '../assets/images/avator2.png'
import avator3 from '../assets/images/avator3.png'
import avator4 from '../assets/images/avator4.png'
import avator5 from '../assets/images/avator5.png'

export const feedsData = [
  {
    id: 1,
    type: 'recommend',
    user: { name: '烟火达人', avatar: avator1 },
    time: '刚刚',
    location: '浏阳河畔',
    title: '今晚烟花秀倒计时',
    content: '主题征集活动开启，参与赢取纪念徽章！',
    image: feed1,
    likes: 23
  },
  {
    id: 2,
    type: 'recommend',
    user: { name: '共治之星', avatar: avator2 },
    time: '1 小时前',
    location: '市民广场',
    title: '志愿者招募开启',
    content: '本周末城市公益活动等你来参与～',
    image: feed2,
    likes: 56
  },
  {
    id: 3,
    type: 'recommend',
    user: { name: '美食捕手', avatar: avator3 },
    time: '昨天',
    location: '老街口',
    title: '地道菜打卡',
    content: '浏阳特色小吃推荐合集，快来收藏！',
    image: feed3,
    likes: 102
  },
  {
    id: 4,
    type: 'follow',
    user: { name: '温暖市民', avatar: avator0 },
    time: '2 天前',
    location: '锦城大道',
    title: '文明出行倡议',
    content: '大家一起守交通文明，让城市更温暖。',
    image: feed4,
    likes: 41
  },
  {
    id: 5,
    type: 'follow',
    user: { name: '烟花爱好者', avatar: avator4 },
    time: '上周',
    location: '烟花大桥',
    title: '上周烟火秀精彩回顾',
    content: '现场震撼，新手摄影也能拍出大片！',
    image: last1,
    likes: 87
  },
  {
    id: 6,
    type: 'recommend',
    user: { name: '烟火志愿者', avatar: avator5 },
    time: '3 小时前',
    location: '市民广场',
    title: '活动布置幕后',
    content: '为周末的城市活动做准备，欢迎加入我们～',
    image: last2,
    likes: 35
  },
  {
    id: 7,
    type: 'recommend',
    user: { name: '摄影新手', avatar: avator2 },
    time: '今天',
    location: '浏阳河畔',
    title: '第一次拍烟花',
    content: '原来手机也能拍出好看的烟花照片！',
    image: feed1,
    likes: 64
  },
  {
    id: 8,
    type: 'follow',
    user: { name: '本地美食家', avatar: avator3 },
    time: '昨天',
    location: '老街口',
    title: '地道菜合集第2期',
    content: '这几家店真的值得排队，推荐给大家！',
    image: feed2,
    likes: 98
  },
  {
    id: 9,
    type: 'recommend',
    user: { name: '烟花工艺师', avatar: avator4 },
    time: '4 小时前',
    location: '工坊',
    title: '匠心独运的烟花工艺',
    content: '传承工艺，点亮城市夜空的一束光。',
    image: last3,
    likes: 120
  },
  {
    id: 10,
    type: 'recommend',
    user: { name: '城市记录者', avatar: avator5 },
    time: '2 天前',
    location: '市民广场',
    title: '与城市的温暖瞬间',
    content: '每个人都是城市的一道光。',
    image: feed3,
    likes: 45
  },
  {
    id: 11,
    type: 'follow',
    user: { name: '邻里互助', avatar: avator1 },
    time: '上周',
    location: '社区中心',
    title: '邻里互助故事集',
    content: '小小举动让人心更近。',
    image: last4,
    likes: 72
  },
  {
    id: 12,
    type: 'recommend',
    user: { name: '烟花之友', avatar: avator0 },
    time: '刚刚',
    location: '浏阳市区',
    title: '节庆烟花预告',
    content: '一起期待本月的烟花节～',
    image: feed4,
    likes: 33
  }
]

export function getFeedById(id) {
  return feedsData.find((f) => String(f.id) === String(id))
}