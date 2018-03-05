import VoHelper from './helpers/VOHelper';
import Events from '../../src/core/events/Events';
import MediaPlayerEvents from '../../src/streaming/MediaPlayerEvents';
import MediaPlayerModel from '../../src/streaming/models/MediaPlayerModel';
import FragmentController from '../../src/streaming/controllers/FragmentController';

const expect = require('chai').expect;

describe('FragmentController', function () {
    const context = {};
    const voHelper = new VoHelper();
    const mediaPlayerModel = MediaPlayerModel(context).getInstance();
    const fragmentController = FragmentController(context).create({
        mediaPlayerModel: mediaPlayerModel
    });

    Events.extend(MediaPlayerEvents);

    it('should create or return model for a given media type', function () {
        const model = fragmentController.getModel('video');
        expect(model).to.exist; // jshint ignore:line
    });

    it('should always return the same model for the context', function () {
        const context1 = 1;
        const context2 = 2;

        const model1 = fragmentController.getModel(context1);
        const model2 = fragmentController.getModel(context2);

        expect(fragmentController.getModel(context1)).to.be.equal(model1);
        expect(fragmentController.getModel(context2)).to.be.equal(model2);
    });

    it('should identify an initialization segment', function () {
        var request = voHelper.getInitRequest();
        expect(fragmentController.isInitializationRequest(request)).to.be.ok; // jshint ignore:line

        request.type = 'unknown';
        expect(fragmentController.isInitializationRequest(request)).to.not.be.ok; // jshint ignore:line

        request.type = undefined;
        expect(fragmentController.isInitializationRequest(request)).to.not.be.ok; // jshint ignore:line

        expect(fragmentController.isInitializationRequest(null)).to.not.be.ok; // jshint ignore:line
    });
});
