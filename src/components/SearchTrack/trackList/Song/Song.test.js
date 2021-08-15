import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@testing-library/jest-dom';
import Song from './index.tsx';
import data from '../../../../data/Data';

test('All track component rendered correctly', () => {
    render(
        <Song
            title={data[0].name}
            artist={data[0].artists[0].name}
            image={data[0].album.images[1].url}
            handleSelect={(uri) => {
                // eslint-disable-next-line no-console
                console.log(uri);
            }}
        />,
    );

    const trackTitle = screen.getByTestId('track-title');
    const trackArtist = screen.getByTestId('track-artist');
    const selectTrackButton = screen.getByText(/select/i);

    expect(trackTitle).toHaveTextContent(data[0].name);
    expect(trackArtist).toHaveTextContent(data[0].artists[0].name);
    expect(selectTrackButton).toBeVisible();
});

test('button selects track', () => {
    render(
        <Song
            title={data[0].name}
            artist={data[0].artists[0].name}
            image={data[0].album.images[1].url}
            handleSelect={(uri) => {
                // eslint-disable-next-line no-console
                console.log(uri);
            }}
        />,
    );
    const uriOnConsole = jest.spyOn(console, 'log');
    const selectTrackButton = screen.getByText(/select/i);
    userEvent.click(selectTrackButton);
    expect(uriOnConsole).toHaveBeenCalledWith(data[0].uri);
});
