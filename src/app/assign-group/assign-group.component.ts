import { Component, OnInit } from '@angular/core';
import { StudentManagementService } from '../shared/service/student-management.service';
import { ErrorsHandler } from '../shared/common/errors-handler';
import { Router } from '@angular/router';
import { AssignGroupOptions } from '../shared/model/assign-group-option';
import { Student } from '../shared/model/student';
import { UpdateStudentGroup } from '../shared/model/update-group';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-assign-group',
  templateUrl: './assign-group.component.html',
  styleUrls: ['./assign-group.component.scss']
})
export class AssignGroupComponent implements OnInit {

  loadingVisible: boolean = true;
  selectNoOfGroupDiv: boolean = false;
  selectAplhabeticalDiv: boolean = false;
  showTotalCountDiv: boolean = false;
  showGroupSelectDiv: boolean = false;
  selectYearDiv: boolean = false;
  showStudentGroupListDiv: boolean = false;
  itemVisible: boolean = false;

  showFilterRow: boolean;
  currentFilter: any;
  optionId: any;
  countOfStudentToDisplay: number;
  studentCountIncluded: number;
  numberOfGroups: number;
  groupNumber:string;
  startAlphabet: string;
  endAlphabet: string;
  countOfStudentYearWise: Map<number, number>;

  options: AssignGroupOptions[];
  year: number[] = [];
  alphabets: string[] = [];
  selectedAlphabets: string[];
  group: string[] = [];
  yearWiseStudentRecords: Student[] = [];
  studentList: UpdateStudentGroup[] = [];

  fieldArray: Array<any> = [];
  newAttribute: any = {};

  constructor(private studentService: StudentManagementService,
    private errorHandler: ErrorsHandler,
    private router: Router) {
      this.showFilterRow = true;
     }

  ngOnInit(): void {

    this.loadingVisible = false;
    this.selectYearDiv = true;
    this.year = [1, 2, 3, 4, 5];
    this.options = [{ "id": 0, "optionValue": "Select" }, { "id": 1, "optionValue": "Alphabetically" },
    { "id": 2, "optionValue": "By Total Count" }];
    this.group = ["G1", "G2", "G3", "G4", "G5", "G6"];
    this.loadCountOfStudentYearWise();
    // this.countOfStudentToDisplay = 205;
    this.assignAlphabets();
  }
  assignAlphabets() {
    this.alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  }


  onSelectYearChange(e) {
    this.showGroupSelectDiv = true;
    this.countOfStudentToDisplay = this.countOfStudentYearWise[e.value];
    this.studentService.yearWiseStudentRecords(e.value).subscribe((data) => {
      this.yearWiseStudentRecords = data;
    },
      (error) => {
        this.loadingVisible = false;
        this.errorHandler.handleError(error);
      });
  }

  loadCountOfStudentYearWise() {
    this.studentService.loadCountOfStudentYearWise().subscribe((data) => {
      this.countOfStudentYearWise = data;
      this.loadingVisible = false;
    },
      (error) => {
        this.loadingVisible = false;
        this.errorHandler.handleError(error);
      });
  }

  onSelectGroupByChange(e) {
    this.optionId = e.value;
   // console.log('option selected: ' + this.optionId);

    if (this.optionId == 1) {
      this.selectAplhabeticalDiv = true;
      this.selectNoOfGroupDiv = false;
    }
    else if (this.optionId == 2) {
      this.selectAplhabeticalDiv = false;
      this.selectNoOfGroupDiv = true;
    }
    else {
      this.selectAplhabeticalDiv = false;
      this.selectNoOfGroupDiv = false;
    }
  }
  onSelectNumberOfGroups(e) {
   // console.log('in onSelectNumberOfGroups' + e.value);
    let group = e.value;
    let length = this.yearWiseStudentRecords.length;
    let count = Math.ceil(length/group);
    let k : number = 0; let i : number = 1; let j: number = 1;

    for(i=1;i<=group;i++)
    {
      this.groupNumber = "G"+i;
     // console.log(this.groupNumber);
      for(j=1;j<=count && k<=length-1; j++)
      {
        this.yearWiseStudentRecords[k].groupDivision="";
        this.yearWiseStudentRecords[k].groupDivision=this.groupNumber;
        k++;
      }
    }
  }
  
  onSelectStartAlphabet(e) {
    this.startAlphabet = e.value;
  }

  onSelectEndAlphabet(e) {
    this.endAlphabet = e.value;
   // console.log(this.startAlphabet + ' ' + this.endAlphabet);
    let count = 0;
    if (this.startAlphabet != null && this.endAlphabet != null) {
      for (var i = this.startAlphabet.charCodeAt(0); i <= this.endAlphabet.charCodeAt(0); i++) {
        let c = String.fromCharCode(i);
        count = count + this.getCountOfStudentForAlphabet(c);
      }
    }
    this.studentCountIncluded = count;
    /* this.alphabets.findIndex((value)=> this.endAlphabet, (index)=> 0); // slice(this.endAlphabet); */
  }
  getCountOfStudentForAlphabet(c): number {
    return this.yearWiseStudentRecords
      .filter((student) => student.firstName.startsWith(c.toLowerCase()) || student.firstName.startsWith(c.toUpperCase()))
      .length;
  }
  onSelectGroupNumber(e){
    this.groupNumber = e.value;
  }
  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
   // console.log(this.newAttribute);
   // console.log('fieldArray :  ' + this.fieldArray);

    let count = 0;
    for (var i = this.startAlphabet.charCodeAt(0); i <= this.endAlphabet.charCodeAt(0); i++) {
      let c = String.fromCharCode(i);
      this.updateStudentCodeTemp(c, this.groupNumber);
    }
    this.newAttribute = {};
  }

  updateStudentCodeTemp(c, groupNumber) {
    let singleStudent: Student[];
    singleStudent = this.yearWiseStudentRecords.filter((student) =>
    student.firstName.startsWith(c.toLowerCase()) || student.firstName.startsWith(c.toUpperCase()));
    singleStudent.forEach((record)=>{record.groupDivision = groupNumber});
  }
  showStudentGroupWiseList() {
    this.selectYearDiv = false;
    this.showTotalCountDiv = false;
    this.showGroupSelectDiv = false;
    this.selectNoOfGroupDiv = false;
    this.selectAplhabeticalDiv = false;
    this.showStudentGroupListDiv = true;
  //  console.log(this.yearWiseStudentRecords.length);
  }

  resetData() {
   // console.log('resetData hit');
    if(this.optionId ==1){
      this.selectAplhabeticalDiv = false;
      this.fieldArray = [];
    }
    if(this.optionId ==2){
      this.selectNoOfGroupDiv = false;
    }
    this.optionId = this.options.filter((option) => option.id == 0);
  }

  resetDataAfterPreview(){
    this.selectYearDiv = true;
    this.showTotalCountDiv = false;
    this.showGroupSelectDiv = false;
    this.selectNoOfGroupDiv = false;
    this.selectAplhabeticalDiv = false;
    this.showStudentGroupListDiv = false;
  }

  updateGroups(){
    
    this.loadingVisible = true;
    this.yearWiseStudentRecords.forEach((student) => {
      let tempStudent: UpdateStudentGroup = new UpdateStudentGroup();
      tempStudent.userName = student.userName;
      tempStudent.groupNumber = student.groupDivision;
     // console.log(tempStudent.userName + ' '+ tempStudent.groupNumber);
      this.studentList.push(tempStudent);
    });
    this.studentService.updateGroups(this.studentList).subscribe((data)=>{
      notify('Groups updated successfully','success',4000);
      this.loadingVisible = false;
      this.resetData();
      this.router.navigate(['/assignGroup']);
    },
    (error)=>{
      this.loadingVisible = false;
        this.errorHandler.handleError(error);
        notify('Some Error Occured','error',4000);
        this.router.navigate(['/assignGroup']);
    });
  }
}  
