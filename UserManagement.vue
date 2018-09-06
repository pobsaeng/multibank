<template>
<div>

<div id="listbox-modal" class="modal fade">
  <div class="modal-dialog">
      <div class="modal-content">
        <div class="row">
          <div class="col-md-12">

          <div class="box-header with-border">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true" @click="closeModal">×</span><span class="sr-only" @click="closeModal">close</span></button>
            <h4 class="modal-title">Create New User</h4>
          </div>
          <div id="modalBody" class="modal-body">
            <div class="row">
              <div class="col-md-12">

                <form class="form-horizontal" novalidate>

                  <div class="form-group">
                    <label class="control-label col-sm-3">User name</label>
                    <div class="col-md-9">
                      <input type="text" 
                        v-model="UserModel.username"
                        name="username"
                        v-validate="'required'"
                        :class="{'input form-control': true, 'has-error': errors.has('username') }"/>
                      <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="control-label col-sm-3">Password:</label>
                    <div class="col-md-9">
                      <input type="password"
                        v-model="UserModel.password"
                        name="password"
                        v-validate="'required'"
                        :class="{'input form-control': true, 'has-error': errors.has('password') }"/>
                      <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-3">Re-type</label>
                    <div class="col-md-9">
                      <input type="password"
                        v-model="UserModel.password_retype"
                        name="password_retype"
                        v-validate="'required'"
                        :class="{'input form-control': true, 'has-error': errors.has('password_retype') }"/>
                      <p class="text-danger" v-if="errors.has('password_retype')">{{ errors.first('password_retype') }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-3">Full Name</label>
                    <div class="col-md-9">
                      <input type="text"
                        v-model="UserModel.fullname"
                        name="fullname"
                        v-validate="'required'"
                        :class="{'input form-control': true, 'has-error': errors.has('fullname') }"/>
                      <p class="text-danger" v-if="errors.has('fullname')">{{ errors.first('fullname') }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-3">Email Addres</label>
                    <div class="col-md-9">
                      <input type="email" 
                        v-model="UserModel.email"
                        name="email"
                        v-validate="'required'"
                        :class="{'input form-control': true, 'has-error': errors.has('email') }"/>
                      <p class="text-danger" v-if="errors.has('email')">Please enter email.</p>
                    </div>
                  </div>
                </form>
                
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <label class="control-label">Groups</label>
                <div id="vueapp" class="vue-app">
                  <kendo-listbox id="optional"
                        :data-source=dsMenuItems
                        :data-text-field="'text'"
                        :data-value-field="'id'"                
                        :draggable="true"
                        :connect-with="'selected'"
                        :drop-sources="['selected']"
                        :toolbar-tools="['transferTo', 'transferFrom', 'transferAllTo', 'transferAllFrom']"
                        style="width:100%; height:250px;">
                  </kendo-listbox>
                </div>
              </div>
              <div class="col-md-6">
                <label class="control-label"></label>
                <div id="vueapp" class="">
                  <kendo-listbox id="selected"
                        :draggable="true"
                        :connect-with="'optional'"
                        :drop-sources="['optional']"
                        style="width:100%; height:250px;"
                        name="listboxSelected">
                  </kendo-listbox>
                </div>
              </div>

              <p class="text-danger" v-if="errors.has('listboxSelected')">{{ errors.first('listboxSelected') }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <div class="control-group">
              <button class="btn btn-warning" @click="closeModal" data-dismiss="modal">Cancel</button>
              <button class="btn btn-primary" @click="onSave">Save</button>
            </div>   
          </div>

          </div>
        </div>
          
      </div>
  </div>
</div>

<div class="row">      
  <div class="col-md-12">
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">User Management</h3>
      </div>
      <div class="box-body">

        <div class="row"> 
          
          <div class="col-md-4">
            <form class="btn-group" role="search">
              <div class="input-group add-on">
                <input class="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text">
                <div class="input-group-btn">
                  <button class="btn btn-primary" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                </div>
              </div>
            </form>
          </div>

          <div class="col-md-8">
             <div class="btn-group pull-right">
              <button type="button" class="btn btn-primary" @click="onShowListBox"><i class="fa fa-plus-square"></i> Add User</button>
              <button type="button" class="btn btn-info"><i class="fa fa-pencil-square-o"></i> Edit User</button>
              <button type="button" class="btn btn-danger"><i class="fa fa-trash-o"></i> Delete User</button>
              <button type="button" class="btn btn-warning"><i class="fa fa-window-restore"></i> Reset Password</button>
            </div>
          </div>
        </div>

        <div class="row top-buffer">
          <div class="col-xs-12">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
              <tr>
                <th>User Name</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Login Count</th>
                <th>Last Login (Local Time)</th>
                <th>Last IP Address</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>pob@gmail.com</td>
                <td>Kraipob Saengkhunthod</td>
                <td>pob@gmail.com</td>
                <td>5</td>
                <td>2018-09-05</td>
                <td>10.100.60.40</td>
              </tr>
              <tr>
                <td>joe@gmail.com</td>
                <td>Joe Joery</td>
                <td>joe@gmail.com</td>
                <td>3</td>
                <td>2018-09-05</td>
                <td>10.100.60.14</td>
              </tr>
              <tr>
                <td>suga@gmail.com</td>
                <td>Suga Caros</td>
                <td>suga@gmail.com</td>
                <td>2</td>
                <td>2018-09-05</td>
                <td>10.100.60.11</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
import $ from "jquery";
import UserModel from "../models/UserModel.js";

export default {
  name: "usermanagement",
  data() {
    return {
      UserModel: UserModel,
      dsMenuItems: [
        { id: "1", text: "User Management", value: "10" },
        { id: "2", text: "Bank/Branch Management", value: "20" },
        { id: "3", text: "Holiday Management", value: "30" },
        { id: "4", text: "Bank Signature Management", value: "40" },
        { id: "5", text: "Home", value: "50" },
        { id: "6", text: "System Admin", value: "60" },
        { id: "7", text: "Customer Management", value: "70" },
        { id: "7", text: "Cheque Management", value: "70" },
        { id: "7", text: "Daily Management", value: "70" },
        { id: "7", text: "Report", value: "70" }
      ]
    };
  },
  mounted() {
    // $(function() {
    //   $("#example1").DataTable();
    //   $("#example2").DataTable({
    //     paging: true,
    //     lengthChange: false,
    //     searching: false,
    //     ordering: true,
    //     info: true,
    //     autoWidth: false
    //   });
    // });
  },
  methods: {
    onShowListBox() {
      $("#listbox-modal")
        .modal({
          backdrop: "static",
          keyboard: false
        })
        .css({
          width: "auto",
          heigh: "auto"
        })
        .on("show.bs.modal", function() {
          var height = $(window).height() - 200;
          $(this)
            .find(".modal-body")
            .css("max-height", height);
        });
    },
    onSave() {
      const me = this;
      me.$validator.validateAll().then((result) => {
        console.log('result: ' + result);
        if (result) {
          console.log(this.UserModel);
          
          return;
        }
      });
    },
    closeModal() {}
  }
};
</script>
<style scoped>
.top-buffer {
  margin-top: 10px;
}
label {
  color: #000;
}
.form-group {
  margin-bottom: 10px;
}
.text-danger {
  height: 5px;
}
.has-error {
  border-color: #dd4b39;
  box-shadow: none;
}
</style>
