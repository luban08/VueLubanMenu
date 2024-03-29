# vue-luban-menu

> 一个简单的鲁班导航菜单组件，基于[Vue.js](http://vuejs.org)


## 安装

```bash
npm install vue-luban-menu --save
```

### 引入

```js
import Vue from 'vue'
import LubanMenu from 'vue-luban-menu'

Vue.use(LubanMenu)
// or
import LubanMenu from 'vue-luban-menu'
Vue.component(LubanMenu.name, LubanMenu)
```

### 使用

```html
<vue-luban-menu 
	:z-index="100" 
	:offset-top="54"
	:apps="apps" 
	:favorites="favorites" 
	@favorite-remove="removeFavorite" 
	@favorite-add="addFavorite"
>
      <div>click me</div>
</vue-luban-menu>
```

### Props

| 名称 | 介绍 | 类型 | 备注 |
|-----------|-----------|-----------|-------------|
| apps | 应用数据列表，树形结构，直接使用原始接口数据 | `Array` | 必填 |
| favorites | 收藏列表，默认为空数组 | `Array` | 可选 |
| z-index | 菜单的z-index，默认2000 | `Number` | 可选 |
| offset-top | 菜单顶部位置，默认54 | `Number` | 可选 |
| use-default-action | 是否允许收藏添加或移除的默认行为 | `Boolean` | 可选 |


### Events

| 名称 | 介绍 | 回调参数 |
|-----------|-----------|-----------|
| favorite-remove | 删除收藏时触发的hook，可以在外部维护favorites | 应用项item |
| favorite-add | 添加收藏时触发的hook，可以在外部维护favorites | 应用项item |
| menu-click | 点击菜单项hook | 应用项item |


### apps 应用数据列表demo

```html
[
	{
		id: 1,
		title: '应用开发',
		appInstances: [
			{ id:11, title: '数据质量开发' },
			{ id:12, title: '数据服务开发' },
			{ id:13, title: 'steamSQL' },
			{ id:14, title: '工作流开发' }
		]
	}
]
```

### favorites demo

```html
[
	{
		id: 1,
		menuApplicationId: 11,
		title: '数据服务开发'
	}
]
```
