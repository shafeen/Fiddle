angular.module("gradetrackerApp", [])
.controller("GradeTrackerCtrl", function () {
    var gradetracker = this;
    gradetracker.totalClasses = 4;
    gradetracker.grades = [
        {name: 'Psych 101', grade: 'B', bestPossible: 'A', worstPossible: 'C'},
        {name: 'Physics 240', grade: 'C', bestPossible: 'B', worstPossible: 'D'}
    ];

    gradetracker.newClass = {};
    gradetracker.addNewClass = function () {
        gradetracker.grades.push({
            name: gradetracker.newClass.name,
            grade: gradetracker.newClass.grade,
            bestPossible: gradetracker.newClass.bestPossible,
            worstPossible: gradetracker.newClass.worstPossible
        });
        gradetracker.newClass = {};
    };




});