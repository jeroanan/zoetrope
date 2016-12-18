describe('tasksCtrl', function() {
  beforeEach(module('zoetropeControllers'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('initialises correctly', function() {
    
    var controller = $controller('tasksCtrl', {});

    expect(controller.tasks).toEqual({});
    expect(controller.projects).toEqual({});
    expect(controller.sortProp).toBe('idx');
    expect(controller.reverseSort).toBe(false);
    expect(controller.ready).toBe(false);
    expect(controller.error).toBe(false);
  });

  

});
