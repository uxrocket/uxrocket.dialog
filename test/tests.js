/**
 * @author Bilal Cinarli
 */

var expect = chai.expect;

describe('Testing UX Rocket Dialog', function() {
    describe('Properties', function() {
        it('should have version property', function() {
            expect($.uxrdialog).to.have.property('version');
        });
    });
});