angular.module("dcgDatePicker", []);
var DatePicker;
(function (DatePicker) {
    var Directive = (function () {
        function Directive($compile) {
            var _this = this;
            this.$compile = $compile;
            this.restrict = "A";
            this.scope = {
                dateType: "=",
                min: "=",
                max: "=",
                range: "="
            };
            this.require = "ngModel";
            this.link = function (scope, elem, attrs, ngModel) {
                var getCadena = function (dia) {
                    var mes = dia.getMonth() + 1;
                    var cadena = dia.getDate() + "-" + mes + "-" + dia.getFullYear();
                    return cadena;
                };
                var aplicar = function () {
                    var dia = ngModel.$modelValue;
                    elem.val(getCadena(dia));
                };
                if (Object.prototype.toString.call(ngModel.$modelValue) !== "[object Date]") {
                    var fecha = new Date();
                    fecha.setHours(0);
                    fecha.setMinutes(0);
                    fecha.setSeconds(0);
                    fecha.setMilliseconds(0);
                    ngModel.$setViewValue(fecha);
                    aplicar();
                }
                var template = "\n\t\t\t\t<div style=\"position:absolute;display:block;left:{{left}}px;top:{{top}}px;min-width:{{width}}px;padding:10px;box-shadow:0 3px 3px rgba(0,0,0,0.5);\">\n\t\t\t\t\t<div class=\"container-fluid\">\n\t\t\t\t\t\t<div class=\"row bg-primary\" style=\"margin-left:-25px;margin-right:-25px;margin-top:-10px;\">\n\t\t\t\t\t\t\t<!--Mostramos la fila que contiene los a\u00F1os-->\n\t\t\t\t\t\t\t<div class=\"col-xs-4\" style=\"padding:10px;text-align:left;cursor:pointer;\" ng-click=\"cambiaAno(-1)\"><span class=\"glyphicon glyphicon-arrow-left\"></span></div>\n\t\t\t\t\t\t\t<div class=\"col-xs-4\" style=\"padding:10px;text-align:center;\">{{ngModel | date : 'yyyy'}}</div>\n\t\t\t\t\t\t\t<div class=\"col-xs-4\" style=\"padding:10px;text-align:right;cursor:pointer;\" ng-click=\"cambiaAno(1)\"><span class=\"glyphicon glyphicon-arrow-right\"></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\" ng-show=\"dateType === 'dia'\">\n\t\t\t\t\t\t\t<!-- Ahora la fila que contendr\u00E1 el paso del m\u00E9s (si no es vista de meses) -->\n\t\t\t\t\t\t\t<div class=\"col-xs-4\" style=\"text-align:left;cursor:pointer\" ng-click=\"cambiaMes(-1)\"><span class=\"glyphicon glyphicon-arrow-left\"></span></div>\n\t\t\t\t\t\t\t<div class=\"col-xs-4\" style=\"text-align:center;\">{{ngModel | date:'MMM'}}</div>\n\t\t\t\t\t\t\t<div class=\"col-xs-4\" style=\"text-align:right;cursor:pointer\" ng-click=\"cambiaMes(1)\"><span class=\"glyphicon glyphicon-arrow-right\"></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<table class=\"table\" ng-if=\"dateType==='mes'\">\n\t\t\t\t\t\t\t<!-- Ahora las filas de los meses (en caso de que sea vista tipo mes) -->\n\t\t\t\t\t\t\t<tr ng-repeat=\"mes in meses\">\n\t\t\t\t\t\t\t\t<td ng-repeat=\"dia in mes\" ng-class=\"claseDia(dia)\" ng-click=\"asignar(dia)\" style=\"cursor:pointer;text-align:center;\" ng-mouseover=\"mouseover($event)\" ng-mouseleave=\"mouseout($event)\">{{dia | date:'MMM'}}</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- Ahora en caso de que sea fecha de tipo d\u00EDa lo mostramos como una tabla -->\n\t\t\t\t\t\t<table class=\"table\" ng-if=\"dateType === 'dia'\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th ng-repeat=\"dia in diasCabecera track by $index\" style=\"text-align:center;\">{{dia | date : 'EEE'}}</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr ng-repeat=\"semana in semanas track by $index\">\n\t\t\t\t\t\t\t\t<td ng-repeat=\"dia in semana track by $index\" ng-class=\"claseDia(dia)\" ng-click=\"asignar(dia)\" style=\"cursor:pointer;text-align:center;\" ng-mouseover=\"mouseover($event)\" ng-mouseleave=\"mouseout($event)\">{{dia | date:'d'}}</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t";
                console.log(ngModel);
                scope.ngModel = ngModel.$modelValue;
                scope.diasCabecera = [];
                var dia = new Date();
                dia.setMonth(11);
                dia.setFullYear(2003);
                dia.setDate(1);
                dia.setHours(0);
                dia.setMinutes(0);
                dia.setSeconds(0);
                dia.setMilliseconds(0);
                scope.diasCabecera.push(dia);
                for (var i = 0; i < 6; i++) {
                    var dia = new Date(dia.getTime() + 86400000);
                    scope.diasCabecera.push(dia);
                }
                var getMeses = function () {
                    scope.meses = [];
                    var ano = scope.ngModel.getFullYear();
                    var m = 0;
                    for (var i = 0; i < 12; i++) {
                        var nuevoMes = new Date();
                        nuevoMes.setFullYear(ano);
                        nuevoMes.setMonth(i);
                        nuevoMes.setDate(1);
                        nuevoMes.setHours(0);
                        nuevoMes.setMinutes(0);
                        nuevoMes.setSeconds(0);
                        nuevoMes.setMilliseconds(0);
                        if (i % 3 === 0 && i !== 0) {
                            m++;
                        }
                        scope.meses[m] = (scope.meses[m] !== undefined) ? scope.meses[m] : [];
                        scope.meses[m].push(nuevoMes);
                    }
                };
                var getDiaSemana = function (dia) {
                    return (dia === 0) ? 6 : dia - 1;
                };
                var getSemanas = function () {
                    scope.semanas = [];
                    var diaSemana = getDiaSemana(scope.dias[0].getDay());
                    var sem = 0;
                    for (var i = 0; i < diaSemana; i++) {
                        scope.semanas[sem] = (scope.semanas[sem] === undefined) ? [] : scope.semanas[sem];
                        scope.semanas[sem].push(null);
                    }
                    for (var d = 0; d < scope.dias.length; d++) {
                        diaSemana = getDiaSemana(scope.dias[d].getDay());
                        sem = (diaSemana === 0) ? sem + 1 : sem;
                        scope.semanas[sem] = (scope.semanas[sem] === undefined) ? [] : scope.semanas[sem];
                        scope.semanas[sem].push(scope.dias[d]);
                    }
                    for (var i = 6; i > diaSemana; diaSemana++) {
                        scope.semanas[sem] = (scope.semanas[sem] === undefined) ? [] : scope.semanas[sem];
                        scope.semanas[sem].push(null);
                    }
                };
                var getDias = function () {
                    scope.dias = [];
                    var mes = scope.ngModel.getMonth();
                    var dia = new Date();
                    dia.setMonth(mes);
                    dia.setDate(1);
                    dia.setFullYear(scope.ngModel.getFullYear());
                    dia.setHours(0);
                    dia.setMinutes(0);
                    dia.setSeconds(0);
                    dia.setMilliseconds(0);
                    scope.dias.push(dia);
                    var nuevoDia = new Date(dia.getTime() + 86400000);
                    while (mes === nuevoDia.getMonth()) {
                        scope.dias.push(nuevoDia);
                        nuevoDia = new Date(nuevoDia.getTime() + 86400000);
                    }
                    getSemanas();
                };
                scope.cambiaMes = function (tipo) {
                    switch (tipo) {
                        case -1:
                            var mes = (scope.ngModel.getMonth() === 0) ? 11 : scope.ngModel.getMonth() - 1;
                            var dia = 1;
                            var ano = (mes === 11) ? scope.ngModel.getFullYear() - 1 : scope.ngModel.getFullYear();
                            scope.ngModel = new Date();
                            scope.ngModel.setMonth(mes);
                            scope.ngModel.setDate(1);
                            scope.ngModel.setFullYear(ano);
                            break;
                        case 1:
                            var mes = (scope.ngModel.getMonth() === 11) ? 0 : scope.ngModel.getMonth() + 1;
                            var dia = 1;
                            var ano = (mes === 0) ? scope.ngModel.getFullYear() + 1 : scope.ngModel.getFullYear();
                            scope.ngModel = new Date();
                            scope.ngModel.setMonth(mes);
                            scope.ngModel.setDate(1);
                            scope.ngModel.setFullYear(ano);
                            break;
                    }
                };
                scope.cambiaAno = function (ano) {
                    ano = (ano === 1) ? scope.ngModel.getFullYear() + 1 : scope.ngModel.getFullYear() - 1;
                    scope.ngModel.setFullYear(ano);
                    getMeses();
                    getDias();
                };
                scope.claseDia = function (dia) {
                    return (dia !== null && getCadena(dia) === getCadena(ngModel.$modelValue)) ? "bg-success" : "";
                };
                var capa = null;
                scope.activo = false;
                elem.attr("readonly", "true");
                elem.on("click", function () {
                    if (scope.activo) {
                        scope.$apply(function () {
                            esconder();
                        });
                    }
                    else {
                        scope.$apply(function () {
                            render();
                        });
                    }
                });
                scope.mouseover = function (ev) {
                    angular.element(ev.target).addClass("bg-primary");
                };
                scope.mouseout = function (ev) {
                    angular.element(ev.target).removeClass("bg-primary");
                };
                var esconder = function () {
                    angular.element(capa).remove();
                    capa = null;
                    scope.activo = false;
                };
                var render = function () {
                    scope.top = elem[0].offsetHeight - 1;
                    scope.width = elem[0].offsetWidth;
                    scope.left = elem[0].offsetLeft;
                    console.log(scope.top);
                    console.log(scope.left);
                    console.log(scope.width);
                    capa = _this.$compile(template)(scope);
                    elem.parent().append(capa);
                    scope.activo = true;
                };
                scope.asignar = function (dia) {
                    ngModel.$setViewValue(dia);
                    aplicar();
                    esconder();
                };
                scope.$watch("ngModel", function (nueva) {
                    if (nueva !== undefined) {
                        getMeses();
                        getDias();
                    }
                });
            };
        }
        Directive.factory = function () {
            var directiva = function ($compile) { return new Directive($compile); };
            directiva.$inject = ["$compile"];
            return directiva;
        };
        return Directive;
    })();
    angular.module("dcgDatePicker").directive("dcgDatePicker", Directive.factory());
})(DatePicker || (DatePicker = {}));
