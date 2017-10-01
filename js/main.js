//MVO实现高级版
//数据
var model = {
	currentCat: null,
	cats: [
		{
			name: '壯壯',
			clickCount: 0,
			imgSrc: 'images/壯壯.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: '小花',
			clickCount: 0,
			imgSrc: 'images/小花.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: '果果',
			clickCount: 0,
			imgSrc: 'images/果果.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: '小白',
			clickCount: 0,
			imgSrc: 'images/小白.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: '小可愛',
			clickCount: 0,
			imgSrc: 'images/小可愛.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: '露娜',
			clickCount: 0,
			imgSrc: 'images/露娜.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: '路西',
			clickCount: 0,
			imgSrc: 'images/路西.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: 'Candy',
			clickCount: 0,
			imgSrc: 'images/Candy.jpg',
			imgURL: 'www.baidu.com'
		},
		{
			name: 'Jack',
			clickCount: 0,
			imgSrc: 'images/Jack.jpg',
			imgURL: 'www.baidu.com'
		}
	]
};
var octopus = {
	init: function(){
		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
		admin.init();
	},
	getCats: function(){
		return model.cats;
	},
	getCurrentCat: function(){
		return model.currentCat;
	},
	setCurrentCat: function(cat){
		model.currentCat = cat;

		catView.render();
		admin.render();
	},
	increamentCount: function(){
		model.currentCat.clickCount++;

		catView.render();
	}
};

var catListView = {
	//初始化展示页面
	init: function(){
		this.ul = document.getElementById("catsListUl");

		this.render();
	},
	render: function(){
		var cats = octopus.getCats();
		this.ul.innerHTML = "";
		for(var i = 0; i < cats.length; i++){
			var li = document.createElement("li");
			var a = document.createElement("a");
			var cat = cats[i];
			a.href = "#";
			a.textContent = cat.name;
			li.appendChild(a);
			this.ul.appendChild(li);
			//通过闭包绑定列表点击事件
			a.addEventListener("click", (function(catCopy){
				return function(){
					octopus.setCurrentCat(catCopy);
				};
			})(cat));
		}
	}
};
var catView = {
	init: function(){
		this.title = document.getElementById('title');
		this.img = document.getElementById('catImage');
		this.count = document.getElementById('clickTimes');

		this.img.addEventListener("click", function(){
			octopus.increamentCount();
		});

		this.render();
	},
	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.title.textContent = currentCat.name;
		this.img.src = currentCat.imgSrc;
		this.count.textContent = currentCat.clickCount;
	},
};

var admin = {
	init: function(){
		this.admin = document.getElementById('admin');
		this.adminButton = document.getElementById('admin-button');
		this.adminButton.show = true;

		this.adminEdit = document.getElementById('admin-edit');

		this.catName = document.getElementById('catName');
		this.catURL = document.getElementById('catURL');
		this.catCount = document.getElementById('catCount');
		this.submit = document.getElementById('submit');
		this.cansle = document.getElementById('cansle');

		this.adminButton.addEventListener("click", function(){
			admin.adminButton.show = false;

			admin.render();
		});

		this.render();
	},
	render: function(){
		this.catName.value = "";
		this.catURL.value = "";
		this.catCount.value = "";

		if (this.adminButton.show == true) {
			this.admin.style.display = "block";
			this.adminEdit.style.display = "none";
		}else {
			this.admin.style.display = "none";
			this.adminEdit.style.display = "block";
		}

		this.adminButton.show = true;

		this.submit.addEventListener("click", function(){
			var catName = document.getElementById('catName').value;
			var catURL = document.getElementById('catURL').value;
			var catCount = document.getElementById('catCount').value;
			if (catName == "" || catURL == "" || catCount == "") {
				//为什么弹出两次??
				//alert("所有的输入框不能为空");
				return;
			}

			var currentCat = octopus.getCurrentCat();
			currentCat.name = catName;
			currentCat.imgURL = catURL;
			currentCat.clickCount = catCount;

			octopus.setCurrentCat(currentCat);

			admin.render();
		});

		this.cansle.addEventListener("click", function(){

			admin.render();
		});
	}
	
};
octopus.init();
//MVO实现第一版
// var data = {
// 	name: ["壯壯", "小花", "果果", "小白", "小可愛", "露娜", "路西", "Candy", "Jack"],
// 	count: [0]
// };

// var octopus = {
// 	//获取初始数据初始化页面
// 	init: function(){
// 		var cat = data.name[0];
// 		var count = data.count[0];
// 		var names = data.name;
// 		catList.init(names);
// 		catDetail.init(cat, count);
// 		catDetail.detail(cat, count, 0);
// 	},
// 	//列表点击事件获取数据，加载页面
// 	listClick: function(cat, i){
// 		var count = isNaN(data.count[i]) == true ? 0 : data.count[i];
// 		data.count[i] = count;
// 		console.log(cat + ":" + i + ":" + data.count[i]);
// 		catDetail.detail(cat, count, i);
// 	},
// 	//图片点击事件获取数据，加载页面
// 	imageClick: function(i){
// 		//console.log(i);
// 		var count = data.count[i];
// 		count++;
// 		data.count[i] = count;
// 		catDetail.clickTimes(count);
// 	}
// };
// var div = document.getElementById("contain");
// var ul = document.getElementById("catsListUl");
// //猫列表视图
// var catList = {
// 	//初始化展示页面
// 	init: function(names){
// 		for(var i = 0; i < names.length; i++){
// 			var li = document.createElement("li");
// 			var a = document.createElement("a");
// 			a.href = "#";
// 			a.textContent = names[i];
// 			li.appendChild(a);
// 			ul.appendChild(li);

// 			//通过闭包绑定列表点击事件
// 			a.addEventListener("click", (function(cat, i){
// 				return function(){
// 					octopus.listClick(cat, i);
// 				};
// 			})(names[i], i));
// 		}
// 	}
	
// };
// //猫详细信息视图
// var catDetail = {
// 	//初始化展示页面
// 	init: function(cat, count){
// 		var divImg = document.createElement("div");
// 		var title = document.createElement("h2");
// 		var img = document.createElement("img");
// 		var p = document.createElement("p");
// 		var span = document.createElement("span");

// 		//divImg.className = "listcat";
// 		title.id = "title";
// 		title.textContent = cat;
// 		img.src = "images/" + cat + ".jpg";
// 		img.id = "catImage";
// 		img.no = 0;
// 		p.textContent = "点击次数：";
// 		span.id = "clickTimes";
// 		span.textContent = count;
		
// 		p.appendChild(span);
// 		divImg.appendChild(title);
// 		divImg.appendChild(img);
// 		divImg.appendChild(p);
// 		div.appendChild(divImg);
// 	},
// 	//展示猫的详细信息页面
// 	detail: function(cat, count, i){
// 		var title = document.getElementById('title');
// 		var img = document.getElementById('catImage');
// 		var span = document.getElementById('clickTimes');
// 		console.log(cat);
// 		title.textContent = cat;
// 		img.src = "images/" + cat + ".jpg";
// 		img.i = i;
// 		span.textContent = count;
// 		console.log("aaa" + i);
// 		//通过闭包绑定图片点击事件
// 		img.addEventListener("click", function(){
// 				//console.log(this.i);
// 				octopus.imageClick(i);
// 		});
// 	},
// 	//更新点击次数
// 	clickTimes: function(count){
// 		var span = document.getElementById("clickTimes");
// 		span.textContent = count;
// 	}
// };
// octopus.init();
// var cats = ["壯壯", "小花", "果果", "小白", "小可愛", "露娜", "路西", "Candy", "Jack"];
// var div = document.getElementById("contain");
// var ul = document.getElementById("catsListUl");
// for(var i = 0; i < cats.length; i++){
// 	var li = document.createElement("li");
// 	var a = document.createElement("a");
// 	a.href = "#";
// 	a.textContent = (i+1) + " - " + cats[i];
// 	li.appendChild(a);
// 	ul.appendChild(li);

// 	var divImg = document.createElement("div");
// 	var title = document.createElement("h2");
// 	var img = document.createElement("img");
// 	var p = document.createElement("p");
// 	var span = document.createElement("span");

// 	divImg.className = "listcat";
// 	title.textContent = cats[i];
// 	img.src = "images/" + cats[i] + ".jpg";
// 	img.className = cats[i];
// 	img.count = 0;
// 	p.textContent = "点击次数：";
// 	span.id = cats[i] + "Count";
	
// 	p.appendChild(span);
// 	divImg.appendChild(title);
// 	divImg.appendChild(img);
// 	divImg.appendChild(p);
// 	div.appendChild(divImg);

// 	// img.addEventListener("click", function () {
// 	// 	this.count++;
// 	// 	console.log(this.count);
// 	// 	var name = this.className;
// 	// 	document.getElementById(name + "Count").innerHTML = this.count;
// 	// }, false);
// 	//通过闭包实现
// 	var count = img.count;
// 	var name = img.className;
// 	img.addEventListener("click", (function(icount, name){
// 		return function(){
// 			icount++;
// 			console.log(name + "：" + icount);
// 			document.getElementById(name + "Count").textContent = icount;
// 		};
// 	})(count, name));
// };
