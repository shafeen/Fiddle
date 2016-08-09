var Broker = function() {

    // channelSubscribers = { channelName (property) : values (subscribers) }
    var channelSubscribers = {
        default: []
    };

    function publish(channel, message) {
        channel = channel? channel : 'default';
        if (channelSubscribers[channel]) {
            // NOTE: we don't ever store any messages
            publishToSubscribers(channel, message);
        }
    }

    function publishToSubscribers(channel, message) {
        channelSubscribers[channel].forEach(function (subscriber) {
            try {
                subscriber.receive[channel](message);
            } catch (e) {
                console.error("%o doesn't implement a receive(..) interface!");
            }
        });
    }

    // recvCallback signature: function (message) { // whatever }
    function subscribe(channel, subscriber, recvCallback) {
        channel = channel? channel : 'default';
        if (!channelSubscribers[channel]) {
            channelSubscribers[channel] = [];
        }
        channelSubscribers[channel].push(subscriber);
        setupSubscriberCallback(channel, subscriber, recvCallback)
    }

    function setupSubscriberCallback(channel, subscriber, recvCallback) {
        subscriber.receive = subscriber.receive || {};
        subscriber.receive[channel] = recvCallback;
    }

    function unsubscribe(channel, subscriber) {
        channel = channel? channel : 'default';
        if (channelSubscribers[channel]) {
            // NOTE: this is an O(n) operation which can be improved
            channelSubscribers[channel] = channelSubscribers[channel].filter(function (v) {
                return v != subscriber;
            });
            delete subscriber.receive[channel];
        }
    }

    return {
        publish : publish,
        subscribe : subscribe,
        unsubscribe : unsubscribe
    }
}();