import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { switchMap, zip, Subscription, firstValueFrom } from 'rxjs';
import { GeolocationService } from 'src/app/core/services/maps/geolocation.service';
import { MessageToastrService } from 'src/app/core/services/toasts.service';

import { IListDummy } from 'src/app/modules/shared/components/interface/IListDummy.interface';
import { IRespSubs } from 'src/app/modules/shared/components/interface/IRespSubs.interface';
import { ILvID } from '../../interface/ILvID.interface';
import { IStudent } from '../../interface/IStudent.interface';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-crear-estudiantes',
  templateUrl: './crear-estudiantes.component.html',
  styleUrls: ['./crear-estudiantes.component.scss'],
})
export class CrearEstudiantesComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  formStudent!: FormGroup;
  step: number = 0;
  isUpdate: boolean = false;
  idStudent!: string;

  listGradeOrLevel: ILvID[] = [];
  listGroup: IListDummy[] = [];
  student: IStudent = {
    lv_id: {},
  };

  subsData$!: Subscription;
  subsCreate!: Subscription;
  subsUpdate!: Subscription;

  constructor(
    private studentService: StudentService,
    private formBuild: FormBuilder,
    private chf: ChangeDetectorRef,
    private messageToastrService: MessageToastrService,
    private geolocationService: GeolocationService
  ) {
    this.buildForm();
  }

  ngAfterContentChecked(): void {
    this.chf.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subsData$) this.subsData$.unsubscribe();
    if (this.subsCreate) this.subsCreate.unsubscribe();
    if (this.subsUpdate) this.subsUpdate.unsubscribe();
  }

  ngOnInit(): void {
    this.initListFromBack();

    this.studentService.data$.subscribe((resp) => {
      this.cleanField();
      this.buildForm();
      this.isUpdate = resp.isEdit;
      this.validateAction(resp);
    });
  }

  validateAction(obj: IRespSubs) {
    if (!obj.isEdit) {
      return;
    }
    this.student = obj.student!;
    this.formStudent.patchValue(obj.student!);
    this.idStudent = obj.student?._id!;
  }

  buildForm() {
    this.formStudent = this.formBuild.group({
      perfil: new FormGroup({
        first_name: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.maxLength(50)])
        ),
        last_name: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.maxLength(50)])
        ),
      }),
      estudio: new FormGroup({
        lv_id: new FormControl('', Validators.required),
        group: new FormControl('', Validators.required),
      }),
      contacto: new FormGroup({
        email: new FormControl(
          '',
          Validators.compose([
            Validators.email,
            Validators.required,
            Validators.maxLength(100),
          ])
        ),
        phone_number: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.maxLength(50)])
        ),
      }),
    });
  }

  async searchStudent(email: string) {
    const findStudent = this.studentService.findStudent(email);

    return await firstValueFrom(findStudent);
  }

  async saveStudent() {
    const studentExists = await this.searchStudent(
      this.formStudent.get('contacto.email')?.value
    );

    if (!studentExists.data) {
      this.methodCreateStudent();
      return;
    }

    this.messageToastrService.openSnackBar(
      'El estudiante, ya se encuentra registrado'
    );
  }

  methodCreateStudent() {
    const newStudent: IStudent = this.setObjStudent();

    this.subsCreate = this.studentService.createStudent(newStudent).subscribe({
      next: (res) => {
        if (!res.state) {
          this.messageToastrService.openSnackBar(`Error: ${res.desc}`);
          return;
        }

        this.messageToastrService.openSnackBar(
          'Estudiante creado exitosamenta!'
        );
        this.refreshAfertChange();
      },
      error: (err) => {
        this.messageToastrService.openSnackBar(`Error: ${err.message}`);
      },
    });
  }

  updateStudent() {
    this.checkIdStudent();

    const newStudent: IStudent = this.setObjStudent();

    this.subsUpdate = this.studentService
      .updateStudent(this.idStudent, newStudent)
      .subscribe({
        next: (res) => {
          if (!res.state) {
            this.messageToastrService.openSnackBar(`Error: ${res.desc}`);
            return;
          }

          this.messageToastrService.openSnackBar(
            'Estudiante actualizado exitosamenta!'
          );
          this.refreshAfertChange();
        },
        error: (err) => {
          this.messageToastrService.openSnackBar(`Error: ${err.message}`);
        },
      });
  }

  checkIdStudent() {
    if (!this.idStudent) {
      this.messageToastrService.openSnackBar(
        'La identificación del estudiante no se encuentra'
      );
      return;
    }
  }

  findValueInList(array: any, parameter: string, word: string) {
    return array.find((item: any) => item[word] == parameter);
  }

  initListFromBack() {
    zip(this.studentService.getAllExternal('courses/test_get_courses'))
      .pipe(
        switchMap((params) => {
          return this.initListDummy(params);
        })
      )
      .subscribe((resp) => {
        this.listGradeOrLevel = resp.course.courseBack;
      });
  }

  validateActionMethod() {
    if (!this.isUpdate) {
      this.saveStudent();
      return;
    }

    this.updateStudent();
  }

  setObjStudent() {
    const newStudent: IStudent = {
      first_name: this.formStudent.get('perfil.first_name')?.value,
      last_name: this.formStudent.get('perfil.last_name')?.value,
      lv_id: this.findValueInList(
        this.listGradeOrLevel,
        this.formStudent.get('estudio.lv_id')?.value,
        'name'
      ),
      group: this.formStudent.get('estudio.group')?.value,
      email: this.formStudent.get('contacto.email')?.value,
      phone_number: this.formStudent.get('contacto.phone_number')?.value,
      geolocation: this.geolocationService.useLocation,
      status: true,
    };

    return newStudent;
  }

  refreshAfertChange() {
    this.studentService.listStudent.next(true);
    this.studentService.listenChange({
      student: null,
      isEdit: false,
      index: 0,
    });
    this.cleanField();
  }

  cleanField() {
    this.formStudent.reset();
    this.listGroup = [];
    this.listGradeOrLevel = [];
  }

  cancelAction() {
    this.studentService.listenChange({ index: 0 });
    this.cleanField();
  }

  initListDummy(params: Array<any>): [any] {
    this.listGroup = [
      {
        group: 'A',
      },
      {
        group: 'B',
      },
      {
        group: 'C',
      },
    ];

    const obj = {
      course: {
        courseBack: params[0].data,
      },
    };
    this.studentService.listenListChange(obj);
    return [obj];
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
