import { test } from 'qunit';
import moduleForAcceptance from 'cargo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search');

test('searching for "rust"', function(assert) {
    visit('/');
    fillIn('input.search', 'rust');
    andThen(function() {
        findWithAssert('form.search').submit();
    });
    wait();

    andThen(function() {
        assert.equal(currentURL(), '/search?q=rust');
        assert.equal(document.title, 'Search Results for \'rust\' - Cargo: packages for Rust');

        findWithAssert('a[href="/search?page=2&q=rust"]');
        assert.notOk(find('a[href="/search?page=3&q=rust"]')[0]);

        hasText(assert, '#crates-heading', 'Search Results for \'rust\'');
        hasText(assert, '#results', 'Displaying 1-10 of 18 total results Sort by Relevance Relevance Downloads');

        hasText(assert, '#crates .row:first .desc .info', 'rust_mixin 0.0.1');
        hasText(assert, '#crates .row:first .desc .summary', 'Yo dawg, use Rust to generate Rust, right in your Rust. (See `external_mixin` to use scripting languages.)');
        hasText(assert, '#crates .row:first .downloads', '477');
    });
    click('a[href="/search?page=2&q=rust"]');

    andThen(function() {
        assert.equal(currentURL(), '/search?page=2&q=rust');
        assert.equal(document.title, 'Search Results for \'rust\' - Cargo: packages for Rust');

        findWithAssert('a[href="/search?q=rust"]');
        assert.notOk(find('a[href="/search?page=3&q=rust"]')[0]);

        hasText(assert, '#crates-heading', 'Search Results for \'rust\'');
        hasText(assert, '#results', 'Displaying 11-18 of 18 total results Sort by Relevance Relevance Downloads');

        hasText(assert, '#crates .row:first .desc .info', 'rusted_cypher 0.7.1');
    });
});
