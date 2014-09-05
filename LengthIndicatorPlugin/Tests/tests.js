
module("Core", {
    setup : function() {
        $('#qunit-fixture').append($('<input>'));
        this.$inputs = $('#qunit-fixture input').lengthIndicator();
    },
    teardown : function() {
    }
});

QUnit.test("existence test", function(assert) {
    assert.ok($.fn.lengthIndicator, "Plug in plugged in!");
    assert.ok($.fn.lengthIndicator.defaults, "Defaults exist");
});

QUnit.test("wrapper-created test", function(assert) {
    var $parent = this.$inputs.parent();
    var $hint = $parent.children(':first');
    var $output = $hint.children(':first');
    ;
    var $input = $parent.children(':last');

    var wrapperClassName = "LILengthIndicatorWrapper";
    var hintClassName = "LILLengthIndicatorHint";
    var outputClassName = "LILengthIndicatorOutput";
    var hintText = "Characters remaining: ";

    assert.strictEqual($parent.get(0).nodeName, "DIV");
    assert.strictEqual($parent.attr('class'), wrapperClassName);

    assert.strictEqual($hint.get(0).nodeName, "DIV");
    assert.strictEqual($hint.attr('class'), hintClassName);
    assert.strictEqual($hint.contents()[0].nodeValue, hintText);

    assert.strictEqual($output.get(0).nodeName, "SPAN");
    assert.strictEqual($output.attr('class'), outputClassName);

    assert.strictEqual($input.get(0).nodeName, "INPUT");
});

module(
    "Initial Char Calculation",
    {
        setup : function() {
            $('#qunit-fixture').append($('<input>').attr('id', 'empty'));
            this.$emptyInputs = $('#empty').lengthIndicator();

            this.sampleText = "Sample";
            $('#qunit-fixture').append(
                $('<input>').attr('id', 'small').val(this.sampleText));
            this.$smallInput = $('#small').lengthIndicator();

            // 145 chars
            this.largeText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis.";
            $('#qunit-fixture').append(
                $('<input>').attr('id', 'tooLarge').val(this.largeText));
            this.$largeInputs = $('#tooLarge').lengthIndicator();
        },
        teardown : function() {}
    });

QUnit.test("initial chars-remaining calculation test", function(assert) {
    var maxLength = 144;
    var currentInput = this.$emptyInputs.val();
    var $output = this.$emptyInputs.prev().children('span');

    assert.strictEqual($.fn.lengthIndicator.defaults.maxLength, maxLength);
    assert.strictEqual(currentInput, "");
    assert.strictEqual(currentInput.length, 0);
    assert.equal($output.text(), maxLength);

    $output = this.$smallInput.prev().children('span');
    assert.equal($output.text(), maxLength - this.sampleText.length);

    $output = this.$largeInputs.prev().children('span');
    assert.equal($output.text(), 0);
});

module("Keypress events", {
    setup : function() {
        $('#qunit-fixture').append($('<input>'));
        this.$inputs = $('#qunit-fixture input').lengthIndicator();
    },
    teardown : function() {}
});

QUnit.test("input-char input events", function(assert) {
    var maxLength = 144;
        $output = this.$inputs.prev().children('span'), 
        $event = $.Event('input');
    
    assert.equal($output.text(), maxLength);
    
    this.$inputs.val('a');
    this.$inputs.trigger($event);
    assert.equal($output.text(), maxLength - 1);
});

module("Options", {
    setup : function() {
        $('#qunit-fixture').append($('<input>'));
    },
    teardown : function() {}
});

QUnit.test("class test", function(assert) {
    var wrapperClass = "myWrapperClass";
    var hintClass = "myHintClass";
    var outputClass = "myOutputClass";
    var $inputs = $('#qunit-fixture input').lengthIndicator({
        wrapperClass : wrapperClass,
        hintClass : hintClass,
        outputClass : outputClass
    });

    assert.strictEqual($inputs.parent().attr('class'), wrapperClass);
    assert.strictEqual($inputs.prev().attr('class'), hintClass);
    assert.strictEqual($inputs.prev().children(':first').attr('class'),
        outputClass);
});
