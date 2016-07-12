$(function(){
var model = {
	init: function() {
		localStorage.catCurrent = -1;
		localStorage.catDetails = JSON.stringify([
			{ "name": "fluffy",
			  "pic":"images/cat1.png",
			  "count": 0 },			
			{ "name": "bluffy",
			  "pic":"images/cat2.png",
			  "count": 0 },			
			{ "name": "gluffy",
			  "pic":"images/cat3.png",
			  "count": 0 },			
			{ "name": "juffy",
			  "pic":"images/cat4.png",
			  "count": 0 },			
			{ "name": "muffy",
			  "pic":"images/cat5.png",
			  "count": 0 }
			])			
		},
	getCarPic: function(catImage) {
			var data = JSON.parse(localStorage.catDetails);
			localStorage.catCurrent = catImage;
			return ([data[catImage].pic,data[catImage].count,data[catImage].name]);
		},
	getCatCount: function() {
			
			var data = JSON.parse(localStorage.catDetails);
			return data.length;
		},
	updateCount: function(checkedCat) {
			var data = JSON.parse(localStorage.catDetails);
			var catCcount = ++data[checkedCat].count;
			data[checkedCat].count = catCcount;
			localStorage.catDetails = JSON.stringify(data);
			return catCcount;
		},
	updateCatDetails: function(nameChange,imgChange,clickChange) {
			var data = JSON.parse(localStorage.catDetails);
			data[localStorage.catCurrent].count = clickChange;
			data[localStorage.catCurrent].pic = imgChange;
			data[localStorage.catCurrent].name = nameChange;
			localStorage.catDetails = JSON.stringify(data);
			return localStorage.catCurrent;
		}
	};

	var octopus = {
		init: function() {
			model.init();
			view.init();
			viewClick.init();
			adminView.init();
		},
		getCarImage: function(catImage) {
			return model.getCarPic(catImage);
		},
		getCatCount: function() {
			return model.getCatCount();
		},
		updateCount: function(checkedCat) {
			return model.updateCount(checkedCat);
		},
		getCurrentCat: function() {
			return localStorage.catCurrent;
		},
		updateCatDetails: function(nameChange,imgChange,clickChange) {
			return model.updateCatDetails(nameChange,imgChange,clickChange);
		}
	};


	var view = {
			init: function() {
			var catCount = 	octopus.getCatCount();
			this.render(catCount);
		},

		render: function(catCount) {
			for(var i=0;i<catCount;i++)
			{
			var HTMLChoosePic = '<input type="radio" name="cat" id="radioChoose" value="%nbr%">cat %nbr%';
			$("#myForm").append(HTMLChoosePic.replace(/%nbr%/g,i));
			}
		},
	};

	var viewClick = {
		init: function() {
			this.catPic = $(".catPic");
			this.countPic = $(".countPic");
			var admin = $(".admin");
			$("input:radio").click(function(){
				var catImage = $("input[type='radio']:checked").val(); 
				var catDet = octopus.getCarImage(catImage);
				viewClick.render(catDet);
			})
			$('.catPic').on('click',"img",function(){
				var checkedCat = $("input[type='radio']:checked").val(); 
				numbUpdate = octopus.updateCount(checkedCat);		
				viewClick.updateCount(numbUpdate);
				if(admin.css('display') == 'block')
				{
				adminView.render(checkedCat);
				}
				})
		},
		render: function(catPic) {
			var HTMLPic = '<img src="%data%" class="KittenImg img-responsive" alt="cat pic">%name%';
			HTMLPic = HTMLPic.replace("%name%",catPic[2]);
			this.catPic.html(HTMLPic.replace("%data%",catPic[0]));
			viewClick.updateCount(catPic[1]);
		},
		updateCount: function(numUpdate) {
			this.countPic.val("Number of Clicks: " + numUpdate);
			
		},
		
	};

	var adminView = {
		init:function() {
			this.name = $("#name");
			this.imgUrl = $("#imgUrl");
			this.clicks = $("#clicks");
			var admin = $(".admin");
			var adminClick = $('#adminClick');
			var cancel = $('#cancel');
			var submit = $('#submit');
			adminClick.click(function(){				
				var catImage = octopus.getCurrentCat(); 
				if( catImage >= 0) {
					admin.css("display","block");
					adminView.render(catImage);
				}
				});
			cancel.click(function(){
				admin.css("display","none");
				});
			submit.click(function() {
				var nameChange = adminView.name.val();
				var imgChange = adminView.imgUrl.val();
				var clickChange = adminView.clicks.val();
				var currentCat = octopus.updateCatDetails(nameChange,imgChange,clickChange);
				var catDet = octopus.getCarImage(currentCat);
				viewClick.render(catDet);
			});
			},
			render:function(catImage) {
				var catDet = octopus.getCarImage(catImage);				
				this.name.val(catDet[2]);
				this.imgUrl.val(catDet[0]);
				this.clicks.val(catDet[1]);					
			},
			
	}
	octopus.init();
	
});










