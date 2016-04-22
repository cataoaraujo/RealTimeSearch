// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require angular/angular
//= require_tree .

app = angular.module('app', []);
app.controller('Analytic', function($scope, $http){
  $scope.articles = [];
  $scope.analytics = [];

  $scope.clean = function() {
    $http.delete('/clean').then(function(result){

    });
    $scope.question = '';
    $scope.articles = [];
    $scope.analytics = [];
  }

  $scope.update = function(){
      $http.post('/analytics.json', {token: $scope.token, title: $scope.question}).then(function(articles){
        $scope.articles = articles.data;
        $scope.updateAnalytics();
      });
  }

  $scope.updateAnalytics = function(){
    $http.get('/analytics.json').then(function(analytics){
      //console.log(analytics.data);
      $scope.analytics = analytics.data;
    });
  }
  $scope.updateAnalytics();

});
