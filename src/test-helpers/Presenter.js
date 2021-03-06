/**
 * Created by jose on 1/04/15.
 */
define(function (require) {
    "use strict";
    var sinon = require('sinon');
    var ViewHelper = require('test-helpers/View');
    var PromiseHelper = require('test-helpers/Promise');

    var exerciseCreateMVP = function (View, di) {
        var realView = ViewHelper.exerciseCreate(View, di);
        return {
            modelStub: sinon.stub(realView.di.model),
            presenter: realView.di.presenter,
            viewStub: sinon.stub(realView)
        };
    };

    var testShowDefineEvents = function (getSut, expected) {
        function getView() { return {event: {}, fn: {}}; }
        function getModel() { return {}; }
        testShowSetsValidEvents(getSut, getView, getModel, expected);
    };

    var testShowSetsValidEvents = function (getSut, getView, getModel, expected) {
        describe("show", function () {
            describe("when view.event is empty", function () {
                it("should define events on show", function () {
                    var view = getView();
                    getSut().show(view, getModel());
                    var actual = Object.keys(view.event);
                    expect(actual).toEqual(expected);
                });
            });
        });
    };

    var exerciseRequestModel = function(getModel, getView, getSut) {
        return function(options) {
            var sut, model, view;
            beforeEach(function() {
                sut = getSut();
                model = getModel();
                view = getView();
            });
            var method = options.method,
                modelMethod = options.modelMethod,
                modelMethodCalledWith = options.modelMethodCalledWith,
                successHandler = options.successHandler,
                errorHandler = options.errorHandler,
                viewMethod = options.viewMethod,
                viewMethodReturn = options.viewMethodReturn;

            function exerciseCallHandler() {
                if (viewMethod) view[viewMethod].returns(viewMethodReturn);
                sut[method](view, model);
            }

            describe('always', function() {
                if (viewMethod) it('calls to view', function() {
                    model[modelMethod].returns(PromiseHelper.fake('ok'));
                    exerciseCallHandler();
                    expect(view[viewMethod].called).toEqual(true);
                });

                it('calls to model', function() {
                    model[modelMethod].returns(PromiseHelper.fake('ok'));
                    exerciseCallHandler();
                    if (modelMethodCalledWith) {
                        expect(model[modelMethod].calledWith(modelMethodCalledWith)).toEqual(true);
                    } else {
                        expect(model[modelMethod].called).toEqual(true);
                    }
                });
            });

            describe('when ' + method + ' is successful', function() {
                it('should call to view ' + successHandler, function() {
                    model[modelMethod].returns(PromiseHelper.fake('ok'));
                    exerciseCallHandler();
                    expect(view[successHandler].called).toEqual(true);
                });
            });

            describe('when ' + method + ' is not successful', function() {
                it('should not call to view ' + successHandler, function() {
                    model[modelMethod].returns(PromiseHelper.fake(undefined, 'error!'));
                    exerciseCallHandler();
                    expect(view[successHandler].called).toEqual(false);
                });

                it('should call to showError', function() {
                    model[modelMethod].returns(PromiseHelper.fake(undefined, 'error!'));
                    exerciseCallHandler();
                    expect(view[errorHandler].called).toEqual(true);
                });
            });
        }
    };

    return {
        exerciseCreateMVP: exerciseCreateMVP,
        testShowDefineEvents: testShowDefineEvents,
        testShowSetsValidEvents: testShowSetsValidEvents,
        exerciseRequestModel: exerciseRequestModel
    };
});