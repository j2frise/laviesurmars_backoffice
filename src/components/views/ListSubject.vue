<template>
  <section class="content">

    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Liste des chapitres</h3>
              <router-link tag="a" :to="$route.path+'/add'">
                <a class="pull-right btn btn-primary">
                  <i class="fa fa-plus"></i>
                  <span class="page">Ajouter un chapitre</span>
                </a>
              </router-link>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table ref="table" aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">Titre</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Miniature</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Nombre d'articles</th>
                        <th aria-label="Engine version: activate to sort column ascending" style="width: 142px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Statut</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(element, index) in myData" :key="index" class="even" role="row">
                        <td class="sorting_1">{{ element.sub_sTitre }}</td>
                        <td><img class="mini" :src="element.sub_sImage" alt=""></td>
                        <td class="text-center">
                          <span :id="'nb'+element.sub_id"> {{ getArticles(element.sub_id) }} <span></span></span>
                          <router-link tag="a" :to="'article/'+element.sub_id">
                            <a class="pull-right btn btn-primary">
                              <i class="fa fa-cog"></i>
                              <span class="page">Administrer</span>
                            </a>
                          </router-link>  
                        </td>
                        <td><span class="label" v-bind:class="parseInt(element.sub_iSta) !== 0 ? 'label-success':'label-danger'">{{ parseInt(element.sub_iSta) !== 0 ? 'actif':'désactivé' }}</span></td>
                        <td>
                            <router-link tag="a" :to="$route.path+'/edit/'+element.sub_id">
                              <a class="btn btn-primary">
                                <i class="fa fa-eye"></i>
                              </a>
                            </router-link>
                            <a href="#" @click="actionRow(element.sub_id, 0)" class="btn btn-danger" v-if="parseInt(element.sub_iSta) !== 0">
                              <i class="fa fa-trash"></i>
                            </a>
                             <a href="#" @click="actionRow(element.sub_id, 1)" class="btn btn-success" v-else >
                              <i class="fa fa-reply"></i>
                            </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import api from '../../api'

export default {
  name: 'ListSubject',
  data(router) {
    return {
      list: 'subject',
      list2: 'article',
      dt: '',
      myData: []
    }
  },
  methods: {
    getSubjects() {
      api
        .request('get', '/list/index.php?q=' + this.list)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.myData = data.return
          } else {
            console.log(data.error)
            return
          }
        })
        .catch(error => {
          console.log(error)
          console.log('Serveur inactif')
        })
    },
    getArticles(sub) {
      api
        .request('get', '/list/index.php?q=' + this.list2 + '&j=' + sub)
        .then(response => {
          var data = response.data
          if (!data.error) {
            var current = document.querySelector('#nb' + sub)
            current.querySelector('span').innerHTML = (data.return).length
          } else {
            console.log(data.error)
            return
          }
        })
        .catch(error => {
          console.log(error)
          console.log('Serveur inactif')
        })
    },
    actionRow(id, status) {
      api
        .request('get', '/statut/index.php?subject=' + id + '&sta=' + status)
        .then(response => {
          var data = response.data
          if (!data.error) {
            this.myData = data.return
          } else {
            console.log(data.error)
            return
          }
        })
        .catch(error => {
          console.log(error)
          console.log('Serveur inactif')
        })
    }
  },
  mounted() {
    this.dt = $(this.$refs.table).DataTable()
    this.getSubjects()
  },
  watch: {
    myData(val) {
      this.dt.destroy()
      this.$nextTick(() => {
        this.dt = $(this.$refs.table).DataTable()
      })
    }
  }
}
</script>

<style>
  .mini{
    width: 70px;
    height: 40px;
  }
</style>
