import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FileService } from '../services/File.service';

@Component({
  selector: 'app-sysbrij-help-files',
  templateUrl: './sysbrij-help-files.component.html',
  styleUrls: ['./sysbrij-help-files.component.css']
})
export class SysbrijHelpFilesComponent implements OnInit {
  
  HelpFileList:any;
  TestFileList: any;
  private IS_LOGGED_IN = 'isLoggedIn';
  constructor(private fileService: FileService, private commonService: CommonService) {
    this.init();
    this.GetHelpFiles();
    this.GetTestFiles();
  }
  private init()
  {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
  }
  private GetHelpFiles()
  {
    this.fileService.GetHelpFileList().subscribe((response) =>{
      console.log(response);
      debugger;
      this.HelpFileList = response.Result;
    })

  }
  private GetTestFiles()
  {
    this.fileService.GetTestFileList().subscribe((response) => {
      console.log(response);
      debugger;
      this.TestFileList = response.Result;
    })

  }

  downloadTestFile(fileName:string,check:boolean) {
    debugger;
    var fileUrl = "assets/TestFiles/";
    fileUrl =fileUrl + fileName ;
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', fileUrl);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
   // link.remove();
  }
  downloadHelpFile(fileName: string) {
    debugger;
    var fileUrl = "assets/HelpFiles/";
    fileUrl = fileUrl + fileName;
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', fileUrl);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    // link.remove();
  }

  ngOnInit(): void {
  }

}
