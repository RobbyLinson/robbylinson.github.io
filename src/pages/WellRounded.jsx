import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import Watching from '../assets/ShrinkingPoster.jpg';
import Reading from '../assets/TheLostMetal.jpg';
import Listening from '../assets/TheGreatDivide.png';

function WellRounded() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl md:text-4xl text-primary">
                Well Rounded
              </CardTitle>
              <button
                onClick={() => navigate('/')}
                className="text-sm text-primary bg-primary/15 px-4 py-1 rounded-full"
              >
                Back Home
              </button>
            </div>
            <p className="text-muted-foreground mt-2">
              A few things I'm into right now, outside of code.
            </p>
          </CardHeader>
        </Card>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Currently Reading */}
          <Card className="overflow-hidden border-border flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center overflow-hidden bg-card">
              <img
                src={Reading}
                alt="Book cover"
                className="h-full object-contain"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-primary uppercase tracking-widest mb-1">
                Currently Reading
              </p>
              <h3 className="text-lg font-semibold">The Lost Metal</h3>
              <p className="text-sm text-muted-foreground">Brandon Sanderson</p>
              <p className="text-muted-foreground text-sm mt-1"></p>
            </div>
          </Card>

          {/* On Repeat */}
          <Card className="overflow-hidden border-border flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center overflow-hidden bg-card">
              <img
                src={Listening}
                alt="Great Divide album cover"
                className="h-full object-contain"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-primary uppercase tracking-widest mb-1">
                On Repeat
              </p>
              <h3 className="text-lg font-semibold">The Great Divide</h3>
              <p className="text-muted-foreground text-sm mt-1">Noah Kahan</p>
            </div>
          </Card>

          {/* Recently Watched */}
          <Card className="overflow-hidden border-border flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center overflow-hidden bg-card">
              <img
                src={Watching}
                alt="Movie or TV show poster"
                className="h-full object-contain"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-primary uppercase tracking-widest mb-1">
                Recently Watched
              </p>
              <h3 className="text-lg font-semibold">Shrinking</h3>
              <p className="text-muted-foreground text-sm mt-1">Apple TV</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WellRounded;
