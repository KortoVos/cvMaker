userData = new Mongo.Collection('user');

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';




Template.designFirst.helpers({
	user: function(){
		//JSON.stringify(Meteor.user(),undefined,2);

		//userData.insert({"test":"asdf"});
		return data;
	},test : function(){
		var data = userData.find();
		return JSON.stringify({"user":Meteor.user()},undefined,2);
	},aboutMe: function(){
		var data = userData.find();
		//return JSON.stringify({"user":userData.find({ _id:Meteor.user()._id}).fetch()[0]},undefined,2);
		return userData.find({ _id:Meteor.user()._id}).fetch()[0]
	}
  /*user:{
  	firstName:"Karsten",
  	surName:"Krachten"
  }*/
});


Template.sideMenu.events({
	'submit .new-aboutMe': function(event){
		
		var aboutMeText = event.target.aboutMe.value;
		userData.update(Meteor.user()._id,
			{
				$set:{
					_id:Meteor.user()._id,
					"cvData.aboutMe":aboutMeText
				}
			},{
				upsert:true
			}
			);
			return false;
	},'submit .new-userName': function(event){
		var firstname = event.target.firstName.value;
		var surName = event.target.surName.value;
		userData.update(Meteor.user()._id,
			{
				$set:{
					"cvData.firstName":firstname,
					"cvData.surName":surName
				}
			},{
				upsert:true
			}
			);
			return false;
	}
});



Accounts.ui.config({
	passwordSignupFields:"USERNAME_AND_OPTIONAL_EMAIL"
});